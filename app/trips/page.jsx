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
      if (futureTrips.length > 0) {
        return (
          <>
            <h2>Upcoming trips</h2>
            <div className={`upcomingTrips ${styles.renderBookings}`}>
              {futureTrips.map((booking) => {
                return <MyTripsCard booking={booking} key={booking.id} />;
              })}
            </div>
          </>
        );
      }
    }

    return (
      <div className={styles.renderBookings}>
        <div className={styles.noTripsContainer}>
          <Card sx={{ maxWidth: 500 }}>
            <CardHeader
              action={<IconButton aria-label="settings"></IconButton>}
              title="You have no trips booked"
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
      </div>
    );
  };

  const renderMyPastBookings = () => {
    if (bookings && bookings.data && bookings.data.length > 0) {
      const pastTrips = bookings.data.filter((booking) =>
        moment(booking.dateTo).isBefore()
      );
      return (
        <>
          <h2>Past trips</h2>
          <div className={styles.renderBookings}>
            {pastTrips.map((booking) => {
              return <MyTripsCard booking={booking} key={booking.id} />;
            })}
          </div>
        </>
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
      <h1>My trips</h1>

      {renderMyBookings()}

      {renderMyPastBookings()}
    </div>
  );
}
