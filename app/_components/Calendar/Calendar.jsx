"use client";
import React, { useState } from "react";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import Link from "next/link";
import moment from "moment";
import Button from "../Button/Button";
import { bookingStore } from "../../_lib/store";
import { useRouter } from "next/navigation";

export default function MyBookingCalendar(props) {
  const [bookingDates, setBookingDates] = useState([moment(), moment()]);
  const venue = props.venue;
  const { setVenue, setStartDate, setEndDate } = bookingStore();
  const router = useRouter();
  const bookingClick = () => {
    setVenue(venue);
    setStartDate(bookingDates[0]);
    setEndDate(bookingDates[1]);
    router.push("/book");
  };
  return (
    <div>
      <StaticDateRangePicker
        slotProps={{ actionBar: { actions: [] } }}
        value={bookingDates}
        onChange={(newValue) => setBookingDates(newValue)}
      />

      <Button text="Book" onClick={bookingClick} />
    </div>
  );
}
