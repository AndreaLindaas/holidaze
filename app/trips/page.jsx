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
import moment from "moment";
import useBookingsForUser from "../_hooks/fetchBookingsForUser";
import MyTripsCard from "../_components/MyTripsCard/MyTripsCard";
import styles from "./trips.module.scss";
import Button from "../_components/Button/Button";
import ExploreIcon from "@mui/icons-material/Explore";
import Link from "next/link";
export default function Trips() {
  const { name, accessToken, apiKey } = useStore();

  const { isLoading: isLoadingBookingData, data: bookings } =
    useBookingsForUser(name, apiKey, accessToken);
  const renderMyBookings = () => {
    if (bookings && bookings.data && bookings.data.length > 0) {
      const futureTrips = bookings.data.filter((booking) =>
        moment(booking.dateTo).isAfter()
      );
      console.log(bookings);
      if (futureTrips.length > 0) {
        return futureTrips.map((booking) => {
          return <MyTripsCard booking={booking} key={booking.id} />;
        });
      }
    }

    return (
      <div className={styles.noTripsContainer}>
        <Card sx={{ maxWidth: 500 }}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title="No trips booked..."
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
            <div className={styles.exploreButton}>
              <Link href="/">
                <Button text="Explore" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderMyPastBookings = () => {
    if (bookings && bookings.data && bookings.data.length > 0) {
      const pastTrips = bookings.data.filter((booking) =>
        moment(booking.dateTo).isBefore()
      );
      return pastTrips.map((booking) => {
        return <MyTripsCard booking={booking} key={booking.id} />;
      });
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
      <h1>My trips</h1>
      <h2>Upcoming trips</h2>
      <div className={styles.renderBookings}>{renderMyBookings()}</div>
      <h2>Past trips</h2>
      <div className={styles.renderBookings}>{renderMyPastBookings()}</div>
    </div>
  );
}
