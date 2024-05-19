"use client";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress, Avatar } from "@mui/material";
import styles from "./venue.module.scss";
import MyBookingCalendar from "../../_components/MyBookingCalendar/MyBookingCalendar";
import SimpleSlider from "../../_components/Slider/Slider";
import useVenue from "../../_hooks/fetchVenue";
import Map from "../../_components/Map/Map";
import OwnerInformation from "../../_components/OwnerInformation/OwnerInformation";
import PlaceOffers from "../../_components/PlaceOffers/PlaceOffers";
import { useMediaQuery } from "@mui/material";
import { useStore } from "../../_lib/store";
import moment from "moment";
export default function Venue(props) {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [latLng, setLatLng] = useState([]);
  const { email } = useStore();
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
  const showBookings = () => {
    return venue.bookings.map((booking) => {
      console.log(booking);
      return (
        <li key={booking.id} className={styles.customer}>
          <span>
            <Avatar src={booking.customer.avatar.url} />
          </span>
          <div>
            <div>
              {booking.customer.name} and {booking.guests}{" "}
              {booking.guests == 1 ? "guest" : "guests"}
            </div>
            <div className={styles.dates}>
              {moment(booking.dateFrom).format("MMMM Do YYYY")}-{" "}
              {moment(booking.dateTo).format("MMMM Do YYYY")}
            </div>
          </div>
        </li>
      );
    });
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
              <p className="bold">{venue.price},- per night</p>
              {showRating()}
            </div>
            <div className={styles.description}>
              <h2 className="orangeHeader">About the venue</h2>
              <p>{venue.description}</p>
            </div>
            <PlaceOffers venue={venue} />
            {isDesktop && (
              <>
                {venue.owner.email != email ? (
                  <OwnerInformation owner={venue.owner} />
                ) : (
                  <div>Stå noe om inntjening her</div>
                )}
              </>
            )}
          </div>
        </div>

        {venue.owner.email != email ? (
          <div className={styles.calendar}>
            <MyBookingCalendar venue={venue} />
          </div>
        ) : (
          <div className={styles.bookingsContainer}>
            <h2 className="orangeHeader">Bookings</h2>
            <ul className={styles.showBookings}> {showBookings()}</ul>
          </div>
        )}
      </div>

      {!isDesktop && (
        <>
          {venue.owner.email != email ? (
            <OwnerInformation owner={venue.owner} />
          ) : (
            <div>Stå noe om inntjening her</div>
          )}
        </>
      )}

      {latLng.length == 2 && (
        <Map position={latLng} zoom={8} location={venue.location} />
      )}
    </div>
  );
}
