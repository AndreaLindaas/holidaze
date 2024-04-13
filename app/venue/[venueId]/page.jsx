"use client";
import React, { useEffect } from "react";
import { API_URL } from "../../_lib/constants";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
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
    if (venue.media && venue.media.length > 0)
      return venue.media.map((image, i) => {
        return (
          <div key={i} className={styles.venueCard}>
            <img src={image} alt="image of venue" className={styles.image} />
          </div>
        );
      });
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <h1>
        {venue.location.city}, {venue.location.country}{" "}
      </h1>
      <div>{showImage()}</div>
      <p>{venue.description}</p>
      <p>{venue.maxGuests}</p>
      <p>{venue.price} kr night</p>
    </div>
  );
}
