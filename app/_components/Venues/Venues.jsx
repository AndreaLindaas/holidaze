"use client";
import { API_URL } from "../../_lib/constants";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import VenueCard from "../VenueCard/VenueCard";
import Link from "next/link";
import styles from "./Venues.module.scss";
import Button from "../Button/Button";
export default function Venues(props) {
  const [venues, setVenues] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const { limit } = props;
  useEffect(() => {
    fetch(
      `${API_URL}/venues/?limit=10&offset=${offset}&sort=created&sortOrder=desc`
    )
      .then((response) => response.json())
      .then((result) => {
        setVenues(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, []);

  const showVenues = () => {
    return venues.data.map((venue) => {
      return (
        <Link href={`/venue/${venue.id}`} key={venue.id}>
          <VenueCard venue={venue} />
        </Link>
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
      <div className={styles.venueCardContainer}>{showVenues()}</div>
      <div className={styles.seeMoreButton}>
        <Button text="See more" />
      </div>
    </div>
  );
}
