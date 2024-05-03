"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";
import { CircularProgress } from "@mui/material";
import useBookings from "../_hooks/fetchBookings";
import MyTripsCard from "../_components/MyTripsCard/MyTripsCard";
import VenueCard from "../_components/VenueCard/VenueCard";
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
      return <div> No trips</div>;
    }
  };

  if (isLoadingBookingData) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return <div>{renderMyBookings()}</div>;
}
