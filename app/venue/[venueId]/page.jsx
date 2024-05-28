"use client";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress, Avatar } from "@mui/material";
import styles from "./venue.module.scss";
import MyBookingCalendar from "../../_components/MyBookingCalendar/MyBookingCalendar";
import SimpleSlider from "../../_components/Slider/Slider";
import useVenue from "../../_hooks/fetchVenue";
import Map from "../../_components/Map/Map";
import OwnerInformation from "../../_components/OwnerInformation/OwnerInformation";
import PlaceOffers from "../../_components/PlaceOffers/PlaceOffers";
import { useMediaQuery } from "@mui/material";
import { useStore } from "../../_lib/store";
import { daysBetween } from "../../_lib/utils";
import moment from "moment";
export default function Venue(props) {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [latLng, setLatLng] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(new Date());
  const [tempEndDate, setTempEndDate] = useState(null);
  const { email } = useStore();
  const {
    isLoading,
    data: venue,
    isError,
    error,
  } = useVenue(props.params.venueId);

  const onCalendarDateChange = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
  };

  useEffect(() => {
    if (!isLoading && !!venue.location.lat && !!venue.location.lng) {
      setLatLng({
        lat: venue.location.lat,
        lng: venue.location.lng,
        location: venue.location,
      });
    } else if (
      !isLoading &&
      !!venue.location.address &&
      !!venue.location.city &&
      !!venue.location.country
    ) {
      const address = encodeURI(
        `${venue.location.address} ${venue.location.city} ${venue.location.country}`
      );
      const searchUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=jsonv2`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((result) => {
          if (result.length > 0) {
            setLatLng({
              lat: result[0].lat,
              lng: result[0].lon,
              location: venue.location,
            });
          }
        });
    }
  }, [venue]);
  const showRating = () => {
    let ratings = [];
    for (let i = 0; i < venue.rating; i++) {
      ratings.push(<StarIcon key={i} />);
    }
    return ratings;
  };

  const showBookings = () => {
    return venue.bookings.map((booking) => {
      const numberOfDays = daysBetween(booking.dateFrom, booking.dateTo);
      const numberOfGuests = booking.guests - 1;
      return (
        <li key={booking.id} className={styles.customer}>
          <span>
            <Avatar src={booking.customer.avatar.url} />
          </span>
          <div>
            <div>
              {booking.customer.name}
              {numberOfGuests > 0 &&
                `and ${numberOfGuests}
              ${numberOfGuests == 1 ? "guest" : "guests"}`}
            </div>
            <div className={styles.dates}>
              {moment(booking.dateFrom).format("MMMM Do YYYY")}-{" "}
              {moment(booking.dateTo).format("MMMM Do YYYY")}
            </div>
            <div className={styles.dates}>
              {numberOfDays} nights for {numberOfDays * venue.price},-
            </div>
          </div>
        </li>
      );
    });
  };

  if (isLoading || !venue) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        Something went wrong
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className={styles.headline}>
        {venue.location.city || "Great house"}
        {venue.location.city && venue.location.country ? ", " : ""}
        {venue.location.country || ", Duckburg"}
        {/* {venue.location.address}, {venue.location.country} */}
      </h1>
      <SimpleSlider venue={venue} />
      <div className={styles.flexContent}>
        <div className={styles.venueContentContainer}>
          <div className={styles.venueContent}>
            <div className={styles.introBox}>
              <h2>{venue.name}</h2>
              <p className="bold">{venue.maxGuests} guests</p>
              <p className="bold">{venue.price},- per night</p>
              {showRating()}
            </div>
            <div className={styles.description}>
              <h2 className="orangeHeader">About the venue</h2>
              <p>{venue.description}</p>
            </div>
            <PlaceOffers venue={venue} />
            {isDesktop && (
              <>
                {venue.owner.email != email && (
                  <OwnerInformation owner={venue.owner} />
                )}
              </>
            )}
          </div>
        </div>

        {venue.owner.email != email ? (
          <div className={styles.calendar}>
            <MyBookingCalendar
              venue={venue}
              startDate={tempStartDate}
              endDate={tempEndDate}
              onChange={onCalendarDateChange}
            />
          </div>
        ) : (
          <div className={styles.bookingsContainer}>
            <h2 className="orangeHeader">Bookings</h2>
            {venue.bookings.length > 0 ? (
              <ul className={styles.showBookings}> {showBookings()}</ul>
            ) : (
              <div>No Bookings on this venue</div>
            )}
          </div>
        )}
      </div>

      {!isDesktop && (
        <>
          {venue.owner.email != email && (
            <OwnerInformation owner={venue.owner} />
          )}
        </>
      )}

      {latLng && latLng.lat && latLng.lng && (
        <Map positions={[latLng]} zoom={8} />
      )}
    </div>
  );
}
