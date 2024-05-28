"use client";
import React, { useEffect } from "react";
import { bookingStore, useStore } from "../_lib/store";
import moment from "moment";
import Button from "../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../_lib/constants";
import { TextField, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import Payment from "../_components/Payment/Payment";
import styles from "./book.module.scss";

export default function Booking() {
  const { venue, startDate, endDate, setStartDate, setEndDate } =
    bookingStore();
  const { accessToken, apiKey } = useStore();
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [amountOfGuests, setAmountOfGuests] = useState(0);
  const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  useEffect(() => {
    if (amountOfGuests < 1 || amountOfGuests > venue.maxGuests) {
      setIsBookButtonDisabled(true);
      return;
    }
    setIsBookButtonDisabled(false);
  }, [amountOfGuests]);

  const bookVenue = () => {
    setIsBooking(true);
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
        if (result.errors && result.errors.length > 0) {
          setErrors(result.errors);
          setIsBooking(false);
        } else {
          router.push("/book/success");
        }
      })
      .catch((error) => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
        setIsBooking(false);
      });
  };
  const numberOfNights = moment(endDate).diff(moment(startDate), "days");
  const pricePerNight = venue.price;
  const totalPrice = pricePerNight * numberOfNights;

  return (
    <div className={styles.bookContainer}>
      {venue.media && venue.media.length > 0 && (
        <img src={venue.media[0].url} />
      )}
      <h1 className="center"> {venue.name}</h1>
      <h2 className="center">Booking details</h2>
      <Card className={styles.checkContainer}>
        <div className={styles.flexCheckInOut}>
          <div>
            <h3>Check-in</h3>
            <span>{moment(startDate).format("MMMM Do YYYY")}</span>
          </div>
          <div>
            <h3>Check-out</h3>
            <span>{moment(endDate).format("MMMM Do YYYY")}</span>
          </div>
        </div>
      </Card>
      <div className={styles.cardContainer}>
        <Card className={styles.priceDetailsCard}>
          <h3 className="orangeHeader">Price details</h3>
          <div>
            {venue.price} NOK x {numberOfNights} nights
          </div>
          <div>
            <span className="bold">Total:</span> {totalPrice},-
          </div>
        </Card>
      </div>
      <div className={styles.guests}>
        <label className="bold">Number of guests?</label>
        <TextField
          className="whiteInput numberOfGuests"
          variant="outlined"
          onChange={(e) => setAmountOfGuests(e.target.value)}
          type="number"
          helperText={`This palce allows maximum ${venue.maxGuests} guests`}
        />
      </div>
      <Payment />
      {errors.length > 0 && (
        <div>
          <ul className="center">
            {errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
      <Button
        text="Book"
        onClick={bookVenue}
        className={styles.buttonBook}
        disabled={isBookButtonDisabled}
        isLoading={isBooking}
      />
    </div>
  );
}
