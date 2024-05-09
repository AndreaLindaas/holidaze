import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import SimpleSlider from "../Slider/Slider";
import styles from "./VenueCard.module.scss";
export default function VenueCard(props) {
  const { venue } = props;
  const getCardMedia = () => {
    if (venue.media && venue.media.length > 0) {
      return (
        <CardMedia
          component="img"
          alt=""
          height="140"
          image={venue.media[0].url}
        />
      );
    }
  };

  return (
    <div className={styles.myVenueCardContainer}>
      <Card>
        <div>{getCardMedia()}</div>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {venue.location.city || "Great house"}
            {venue.location.city && venue.location.country ? ", " : ""}
            {venue.location.country || ", Duckburg"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="bold"> {venue.price} NOK </span> night
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="bold">{venue.maxGuests}</span> guests
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
