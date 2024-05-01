"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";
import { CircularProgress } from "@mui/material";
import useBookings from "../_hooks/fetchBookings";
export default function Trips() {
  const { name, accessToken, apiKey } = useStore();

  const { isLoading: isLoadingBookingData, data: bookings } = useBookings(
    name,
    apiKey,
    accessToken
  );

  const renderMyBookings = () => {
    return bookings.data.map((booking) => {
      return <div key={booking.id}>{booking.venue.name}</div>;
    });
  };

  if (isLoadingBookingData) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      Trips
      {renderMyBookings()}
    </div>
  );
}
