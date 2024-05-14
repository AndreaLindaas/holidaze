"use client";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import styles from "./venue.module.scss";
import MyBookingCalendar from "../../_components/MyBookingCalendar/MyBookingCalendar";
import SimpleSlider from "../../_components/Slider/Slider";
import useVenue from "../../_hooks/fetchVenue";
import Map from "../../_components/Map/Map";
import OwnerInformation from "../../_components/OwnerInformation/OwnerInformation";
import PlaceOffers from "../../_components/PlaceOffers/PlaceOffers";
import { addressToLatLong } from "../../_lib/utils";
import { useMediaQuery } from "@mui/material";

export default function Venue(props) {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [latLng, setLatLng] = useState([]);

  const {
    isLoading,
    data: venue,
    isError,
    error,
  } = useVenue(props.params.venueId);

  useEffect(() => {
    if (!isLoading && !!venue.location.lat && !!venue.location.lng) {
      setLatLng([venue.location.lat, venue.location.lng]);
    } else if (
      !isLoading &&
      !!venue.location.address &&
      !!venue.location.city &&
      !!venue.location.country
    ) {
      const address = encodeURI(
        `${venue.location.address} ${venue.location.city} ${venue.location.country}`
      );
      const searchUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=jsonv2`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((result) => {
          if (result.length > 0) {
            setLatLng([result[0].lat, result[0].lon]);
          }
        });
    }
  }, [venue]);
  const showRating = () => {
    let ratings = [];
    for (let i = 0; i < venue.rating; i++) {
      ratings.push(<StarIcon key={i} />);
    }
    return ratings;
  };

  if (isLoading || !venue) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        Something went wrong
        <p>{error}</p>
      </div>
    );
  }
  console.log(venue);
  return (
    <div>
      <h1 className={styles.headline}>
        {venue.location.city || "Great house"}
        {venue.location.city && venue.location.country ? ", " : ""}
        {venue.location.country || ", Duckburg"}
        {/* {venue.location.address}, {venue.location.country} */}
      </h1>
      <SimpleSlider venue={venue} />
      <div className={styles.flexContent}>
        <div className={styles.venueContentContainer}>
          <div className={styles.venueContent}>
            <div className={styles.introBox}>
              <h2>{venue.name}</h2>
              <p className="bold">{venue.maxGuests} guests</p>
              <p className="bold">{venue.price} kr night</p>
              {showRating()}
            </div>
            <div className={styles.description}>
              <h2 className="orangeHeader">About the venue</h2>
              <p>{venue.description}</p>
            </div>
            <PlaceOffers venue={venue} />
            {isDesktop && <OwnerInformation owner={venue.owner} />}
          </div>
        </div>
        <div className={styles.calendar}>
          <MyBookingCalendar venue={venue} />
        </div>
      </div>
      {!isDesktop && <OwnerInformation owner={venue.owner} />}

      {latLng.length == 2 && (
        <Map position={latLng} zoom={8} location={venue.location} />
      )}
    </div>
  );
}
