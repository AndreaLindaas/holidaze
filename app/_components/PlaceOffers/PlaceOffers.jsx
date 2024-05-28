"use client";
import React from "react";
import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import styles from "./PlaceOffers.module.scss";
export default function PlaceOffers(props) {
  const { venue } = props;
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
  );
}
