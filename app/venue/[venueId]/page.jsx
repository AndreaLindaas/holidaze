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
export default function Venue(props) {
  const {
    isLoading,
    data: venue,
    isError,
    error,
  } = useVenue(props.params.venueId);

  const showBreakfast = () => {
    return venue.meta.breakfast ? (
      <span>Breakfast</span>
    ) : (
      <span className="lineThrough">Breakfast</span>
    );
  };
  const showWifi = () => {
    return venue.meta.wifi ? (
      <span>Wifi</span>
    ) : (
      <span className="lineThrough">Wifi</span>
    );
  };
  const showParking = () => {
    return venue.meta.parking ? (
      <span>Parking</span>
    ) : (
      <span className="lineThrough">Parking</span>
    );
  };
  const showPets = () => {
    return venue.meta.pets ? (
      <span>Pets allowed</span>
    ) : (
      <span className="lineThrough">Pets</span>
    );
  };
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
        <div className={styles.offersCard}>
          <Card>
            <div className={styles.offers}>
              <h3 className="center">What this place offers:</h3>

              <CardContent className="center">
                <Typography variant="body2" color="text.secondary">
                  {showWifi()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {showBreakfast()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {showParking()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {showPets()}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </div>
        <div className={styles.calendar}>
          <MyBookingCalendar venue={venue} />
        </div>

        <OwnerInformation owner={venue.owner} />

        <Map
          position={[venue.location.lat, venue.location.lng]}
          zoom={13}
          location={venue.location}
        />
      </div>
    </div>
  );
}
