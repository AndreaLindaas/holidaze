"use client";
import React, { useEffect, useState } from "react";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import Link from "next/link";
import moment from "moment";
import Button from "../Button/Button";
import { useStore, bookingStore } from "../../_lib/store";
import { useRouter } from "next/navigation";
import { getTimestampsBetweenDates } from "../../_lib/utils";
import styles from "./MyBookingCalendar.module.scss";

export default function MyBookingCalendar(props) {
  const [bookingDates, setBookingDates] = useState([null, null]);
  const [allBookedDates, setAllBookedDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(true);
  const { venue } = props;
  const { setVenue, setStartDate, setEndDate } = bookingStore();
  const router = useRouter();

  const bookingClick = () => {
    setVenue(venue);
    setStartDate(bookingDates[0]);
    setEndDate(bookingDates[1]);
    router.push("/book");
  };

  const validateSelectedDates = () => {
    const dates = getTimestampsBetweenDates(bookingDates[0], bookingDates[1]);
    let isValid = true;
    dates.forEach((d) => {
      if (isDateDisabled(d)) {
        isValid = false;
      }
    });
    return isValid;
  };

  useEffect(() => {
    if (!validateSelectedDates()) {
      setErrorMessage("Some of the days are already booked. Please try again.");
      setIsBookButtonDisabled(true);
      return;
    }

    setErrorMessage("");
    setIsBookButtonDisabled(false);
  }, [bookingDates]);

  useEffect(() => {
    //Extract all dates from booking array
    const bookings = venue.bookings;
    //  console.log(bookings);
    let allDates = [];
    bookings.forEach((booking) => {
      const datesBetweenRange = getTimestampsBetweenDates(
        booking.dateFrom,
        booking.dateTo
      );
      allDates = allDates.concat(datesBetweenRange);
    });

    setAllBookedDates(allDates);
  }, [venue]);

  const isDateDisabled = (date, position) => {
    return allBookedDates.find((d) => d.isSame(date));
  };

  return (
    <div>
      <StaticDateRangePicker
        slotProps={{ actionBar: { actions: [] } }}
        value={bookingDates}
        shouldDisableDate={isDateDisabled}
        disablePast
        onChange={(newValue) => setBookingDates(newValue)}
        className={styles.calendar}
      />

      {errorMessage && <p>{errorMessage}</p>}

      <Button
        disabled={isBookButtonDisabled || errorMessage}
        text="Book"
        onClick={bookingClick}
      />
    </div>
  );
}
