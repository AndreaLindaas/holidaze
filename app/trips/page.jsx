"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";
import {
  CircularProgress,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import useBookings from "../_hooks/fetchBookings";
import MyTripsCard from "../_components/MyTripsCard/MyTripsCard";
import styles from "./trips.module.scss";
import Button from "../_components/Button/Button";
import ExploreIcon from "@mui/icons-material/Explore";
import Link from "next/link";
export default function Trips() {
  const { name, accessToken, apiKey } = useStore();

  const { isLoading: isLoadingBookingData, data: bookings } = useBookings(
    name,
    apiKey,
    accessToken
  );
  console.log("bookings", bookings);
  const renderMyBookings = () => {
    if (bookings.data.length > 0) {
      return bookings.data.map((booking) => {
        return <MyTripsCard booking={booking} key={booking.id} />;
      });
    } else {
      return (
        <div className={styles.noTripsContainer}>
          <Card sx={{ maxWidth: 500 }}>
            <CardHeader
              action={<IconButton aria-label="settings"></IconButton>}
              title="No Trips booked..."
              subheader={<ExploreIcon />}
            />
            <CardMedia
              component="img"
              height="300"
              image="/hut.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Time to start planning your next adventure.
              </Typography>
              <Link href="/">
                <Button text="Explore" />
              </Link>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  if (isLoadingBookingData) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.tripsContainer}>
      <h1>Trips</h1>
      <div className={styles.renderBookings}>{renderMyBookings()}</div>
    </div>
  );
}
