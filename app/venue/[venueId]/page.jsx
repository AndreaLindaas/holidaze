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
      <span className="lineTrough">Breakfast</span>
    );
  };
  const showWifi = () => {
    return venue.meta.wifi ? (
      <span>Wifi</span>
    ) : (
      <span className="lineTrough">Wifi</span>
    );
  };
  const showParking = () => {
    return venue.meta.Parking ? (
      <span>Parking</span>
    ) : (
      <span className="lineTrough">Parking</span>
    );
  };
  const showPets = () => {
    return venue.meta.pets ? (
      <span>Pets allowed</span>
    ) : (
      <span className="lineTrough">Pets</span>
    );
  };
  return (
    <div>
      <h1>
        {venue.location.address}, {venue.location.country}
      </h1>
      <SimpleSlider venue={venue} />

      <h2>{venue.name}</h2>
      <p>{venue.maxGuests} guests</p>
      <p>{venue.description}</p>

      <p>{venue.price} kr night</p>
      <h3>What this place offers:</h3>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
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

      <MyBookingCalendar />
    </div>
  );
}
