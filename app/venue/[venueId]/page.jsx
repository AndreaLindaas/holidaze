"use client";
import React, { useEffect, useMemo } from "react";
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
export default function Venue(props) {
  const {
    isLoading,
    data: venue,
    isError,
    error,
  } = useVenue(props.params.venueId);
  const showRating = () => {
    let ratings = [];
    for (let i = 0; i < venue.rating; i++) {
      ratings.push(<StarIcon key={i} />);
    }
    return ratings;
  };

  const renderMap = () => {
    if (!!venue.location.lat && !!venue.location.lng) {
      return (
        <Map
          position={[venue.location.lat, venue.location.lng]}
          zoom={13}
          location={venue.location}
        />
      );
    }
    //  else if (
    //   !!venue.location.address &&
    //   !!venue.location.city &&
    //   !!venue.location.country
    // ) {
    //   const geolocation = addressToLatLong(
    //     encodeURI(
    //       `${venue.location.address} ${venue.location.city} ${venue.location.country}`
    //     )
    //   );
    // }
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
        {venue.location.address}, {venue.location.country}
      </h1>
      <SimpleSlider venue={venue} />
      <div className={styles.venueContent}>
        <div className={styles.introBox}>
          <h2>{venue.name}</h2>
          <p className="bold">{venue.maxGuests} guests</p>
          <p className="bold">{venue.price} kr night</p>
          {showRating()}
        </div>
        <div className={styles.description}>
          <p>{venue.description}</p>
        </div>
        <PlaceOffers venue={venue} />
        <div className={styles.calendar}>
          <MyBookingCalendar venue={venue} />
        </div>

        <OwnerInformation owner={venue.owner} />
        {renderMap()}
      </div>
    </div>
  );
}
