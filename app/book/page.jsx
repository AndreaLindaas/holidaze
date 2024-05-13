"use client";
import React from "react";
import { bookingStore, useStore } from "../_lib/store";
import moment from "moment";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import Button from "../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../_lib/constants";
import { TextField, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import Moment from "moment";
import styles from "./book.module.scss";
export default function Booking() {
  const { venue, startDate, endDate, setStartDate, setEndDate } =
    bookingStore();
  const { accessToken, apiKey } = useStore();
  const router = useRouter();

  const [amountOfGuests, setAmountOfGuests] = useState(0);
  const setBookingDates = (dates) => {
    if (dates && dates.length > 1) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };
  const bookVenue = () => {
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
  const numberOfNights = Moment(endDate).diff(Moment(startDate), "days");
  console.log("numberOfNights", numberOfNights);
  const pricePerNight = venue.price;
  const totalPrice = pricePerNight * numberOfNights;
  console.log("totalPrice", totalPrice);

  return (
    <div className={styles.bookContainer}>
      {venue.media && venue.media.length > 0 && (
        <img src={venue.media[0].url} />
      )}
      <h1> {venue.name}</h1>
      <StaticDateRangePicker
        slotProps={{ actionBar: { actions: [] } }}
        value={[moment(startDate), moment(endDate)]}
        onChange={(newValue) => setBookingDates(newValue)}
      />
      <Card className={styles.priceDetailsCard}>
        <h3 className="orangeHeader">Price details</h3>
        <div>
          {venue.price} NOK x {numberOfNights} nights
        </div>
        <div>
          <span className="bold">Total:</span> {totalPrice}
        </div>
      </Card>
      <div className={styles.guests}>
        <label className="bold">Number of guests?</label>
        <p className={styles.greyText}>
          This place allows maximum
          {""} <span className="bold">{venue.maxGuests}</span> guests
        </p>
        <TextField
          variant="outlined"
          onChange={(e) => setAmountOfGuests(e.target.value)}
        />
      </div>

      <Button text="Book" onClick={bookVenue} className={styles.buttonBook} />
    </div>
  );
}
