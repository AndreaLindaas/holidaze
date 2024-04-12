"use client";
import React, { useEffect } from "react";
import { API_URL } from "../../_lib/constants";
import { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import styles from "./venue.module.scss";
export default function Venue(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [venue, setVenue] = useState("");
  console.log("abcd", venue);
  console.log("denna", props.params.venueId);
  useEffect(() => {
    fetch(`${API_URL}/venues/${props.params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        setVenue(result);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [props.params.venueId]);

  const showImage = () => {
    if (venue.media && venue.media.length > 0)
      return venue.media.map((image, i) => {
        return (
          <img
            src={image}
            alt="image of venue"
            key={i}
            className={styles.image}
          />
        );
      });
  };
  return (
    <div>
      <div>{showImage()}</div>
      <p>{venue.description}</p>
    </div>
  );
}
