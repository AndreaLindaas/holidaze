"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../_lib/constants";
import useBooking from "../../_hooks/fetchBooking";
import { useStore } from "../../_lib/store";
export default function MyTrip(props) {
  const { apiKey, accessToken } = useStore();
  const { isLoading, data: trip } = useBooking(
    props.params.tripId,
    apiKey,
    accessToken
  );
  console.log(trip);
  return (
    <div>
      <h1>Your trip at {trip.data.venue.owner.name}´s place</h1>
    </div>
  );
}
