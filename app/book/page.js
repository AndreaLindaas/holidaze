"use client";
import React from "react";
import { bookingStore, useStore } from "../_lib/store";
import moment from "moment";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import Button from "../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../_lib/constants";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Booking() {
  const { venue, startDate, endDate, setStartDate, setEndDate } =
    bookingStore();
  const { accessToken, apiKey } = useStore();
  const router = useRouter();

  const [bookingDates, setBookingDates] = useState([moment(), moment()]);
  const [amountOfGuests, setAmountOfGuests] = useState(0);
  console.log("jadda", venue);
  const bookVenue = () => {
    setStartDate(bookingDates[0]);
    setEndDate(bookingDates[1]);
    const payload = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: Number(amountOfGuests),
      venueId: venue.id,
    };
    fetch(`${API_URL}/bookings`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        router.push("/book/success");
      })
      .catch((error) => {
        console.log("galt");
      });
  };

  return (
    <div>
      <img src={venue.media[0].url} />
      <h1> {venue.name}</h1>
      <StaticDateRangePicker
        slotProps={{ actionBar: { actions: [] } }}
        value={[moment(startDate), moment(endDate)]}
        onChange={(newValue) => setBookingDates(newValue)}
      />
      <div>
        <label className="bold">Number of guests?</label>
        <p>This place allows maximum {venue.maxGuests} guests</p>
        <TextField
          variant="outlined"
          onChange={(e) => setAmountOfGuests(e.target.value)}
        />
      </div>

      <Button text="Book" onClick={bookVenue} />
    </div>
  );
}
