"use client";
import React, { useEffect, useState } from "react";

import Button from "../Button/Button";
import { useStore, bookingStore } from "../../_lib/store";
import { useRouter } from "next/navigation";
import { getTimestampsBetweenDates } from "../../_lib/utils";
import styles from "./MyBookingCalendar.module.scss";
import { Card } from "@mui/material";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function MyBookingCalendar(props) {
  const [allBookedDates, setAllBookedDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(true);
  const { accessToken } = useStore();
  const { venue, hideBookButton } = props;
  const { setVenue, startDate, endDate, setStartDate, setEndDate } =
    bookingStore();
  const router = useRouter();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const bookingClick = () => {
    setVenue(venue);
    router.push("/book");
  };

  const validateSelectedDates = () => {
    const dates = getTimestampsBetweenDates(startDate, endDate);
    let isValid = true;
    dates.forEach((d) => {
      if (isDateDisabled(d)) {
        isValid = false;
        setStartDate(null);
        setEndDate(null);
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
  }, [startDate, endDate]);

  useEffect(() => {
    //Extract all dates from booking array
    const bookings = venue.bookings;

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
    return allBookedDates.find((d) => moment(d).isSame(date));
  };

  return (
    <div className={styles.calendar}>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        minDate={new Date()}
        inline
        className={styles.calendar}
        excludeDates={allBookedDates}
      />
      {errorMessage && <p>{errorMessage}</p>}
      {!hideBookButton && (
        <>
          {accessToken ? (
            <Button
              className={styles.bookButton}
              disabled={isBookButtonDisabled || errorMessage}
              text="Book"
              onClick={bookingClick}
            />
          ) : (
            <Card className={styles.textForLogin}>
              <div> To book this venue you need to log in.</div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
