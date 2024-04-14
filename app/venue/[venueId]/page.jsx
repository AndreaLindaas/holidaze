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
export default function Venue(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [venue, setVenue] = useState("");
  console.log("abcd", venue);
  console.log("denna", props.params.venueId);
  useEffect(() => {
    fetch(`${API_URL}/venues/${props.params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        setVenue(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [props.params.venueId]);

  const showImage = () => {
    // if (venue.media && venue.media.length > 0)
    //   return venue.media.map((image, i) => {
    return (
      // <div key={i} className={styles.venueCard}>
      //   <img src={image} alt="image of venue" className={styles.image} />
      // </div>
      <ImageList
        sx={{ width: 500, height: 450 }}
        cols={3}
        rowHeight={164}
        // key={i}
      >
        {venue.media.map((image) => (
          <ImageListItem key={image.id}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              alt="images of place"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
  const showBreakfast = () => {
    return venue.meta.breakfast ? (
      <div>Breakfast</div>
    ) : (
      <div className="lineTrough">Breakfast</div>
    );
  };
  const showWifi = () => {
    return venue.meta.wifi ? (
      <div>Wifi</div>
    ) : (
      <div className="lineTrough">Wifi</div>
    );
  };
  const showParking = () => {
    return venue.meta.Parking ? (
      <div>Parking</div>
    ) : (
      <div className="lineTrough">Parking</div>
    );
  };
  const showPets = () => {
    return venue.meta.pets ? (
      <div>Pets allowed</div>
    ) : (
      <div className="lineTrough">Pets</div>
    );
  };
  return (
    <div>
      <h1>
        {venue.location.city}, {venue.location.country}{" "}
      </h1>
      <div>{showImage()}</div>
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
    </div>
  );
}
