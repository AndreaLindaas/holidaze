import React from "react";
import { CardMedia, CardContent, Card, Typography } from "@mui/material";
import Link from "next/link";
import Moment from "moment";
import styles from "./MyTripsCard.module.scss";
export default function MyTripsCard(props) {
  const booking = props.booking;
  return (
    <div className={styles.myTripsCardContainer}>
      <Card sx={{ maxWidth: 345 }}>
        <Link href={`trips/${booking.id}`}>
          <CardMedia
            component="img"
            alt=""
            height="140"
            image={booking.venue.media[0].url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {booking.venue.location.city}, {booking.venue.location.country}
            </Typography>
            <Typography component="div">
              {Moment(booking.dateFrom).format("MMMM Do YYYY")} -
              {Moment(booking.dateTo).format("MMMM Do YYYY")}
            </Typography>
          </CardContent>{" "}
        </Link>
      </Card>
    </div>
  );
}
