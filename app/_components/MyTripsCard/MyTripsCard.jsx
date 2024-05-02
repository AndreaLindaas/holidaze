import React from "react";
import { CardMedia, CardContent, Card, Typography } from "@mui/material";
import Link from "next/link";
export default function MyTripsCard(props) {
  const booking = props.booking;
  console.log("booking", booking);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {" "}
      <Link href={`trips/${booking.id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={booking.venue.media[0].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {booking.venue.location.city}, {booking.venue.location.country}
          </Typography>
        </CardContent>{" "}
      </Link>
    </Card>
  );
}
