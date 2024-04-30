"use client";
import React, { useEffect } from "react";
import { API_URL } from "../../_lib/constants";
import { useState } from "react";
import {
  CircularProgress,
  ImageList,
  ImageListItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "./venue.module.scss";
import MyBookingCalendar from "../../_components/Calendar/Calendar";
import SimpleSlider from "../../_components/Slider/Slider";
export default function Venue(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/venues/${props.params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        setVenue(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [props.params.venueId]);

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
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
  return (
    <div>
      <h1 className={styles.headline}>
        {venue.location.address}, {venue.location.country}
      </h1>
      <SimpleSlider venue={venue} />
      <div className={styles.venueContent}>
        <div className={styles.border}>
          <h2>{venue.name}</h2>
          <p className="bold">{venue.maxGuests} guests</p>
          <p className="bold">{venue.price} kr night</p>
        </div>
        <div className={styles.border}>
          <p>{venue.description}</p>
        </div>
        <div className={styles.offersCard}>
          <Card sx={{ maxWidth: 345 }}>
            <h3 className="center">What this place offers:</h3>
            <CardActionArea>
              <CardContent className="center">
                <Typography variant="body2" color="text.secondary">
                  {showWifi()}{" "}
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
            </CardActionArea>
          </Card>
        </div>
        <MyBookingCalendar />{" "}
      </div>
    </div>
  );
}
