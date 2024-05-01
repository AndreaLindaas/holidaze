"use client";
import React from "react";
import { bookingStore } from "../_lib/store";
export default function Booking() {
  const { venue, startDate, endDate } = bookingStore();
  return (
    <div>
      {venue.name} {startDate}
    </div>
  );
}
