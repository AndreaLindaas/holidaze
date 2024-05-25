import React from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import SimpleSlider from "../Slider/Slider";
import styles from "./VenueCard.module.scss";
import StarIcon from "@mui/icons-material/Star";
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
    } else {
      return (
        <CardMedia component="img" alt="" height="140" image="/no_image.png" />
      );
    }
  };
  const showRating = () => {
    let ratings = [];
    for (let i = 0; i < venue.rating; i++) {
      ratings.push(<StarIcon key={i} />);
    }
    return ratings;
  };
  return (
    <div className={styles.myVenueCardContainer}>
      <Card>
        <div>{getCardMedia()}</div>
        <div className={styles.cardContent}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              className={styles.title}
              component="div"
            >
              {venue.location.city || "Great house"}
              {venue.location.city && venue.location.country ? ", " : ""}
              {venue.location.country || ", Duckburg"}
            </Typography>
            <Typography variant="body2">
              <span className="bold"> {venue.price},- </span> night
            </Typography>
            <Typography variant="body2">
              <span className="bold">{venue.maxGuests}</span> guests
            </Typography>
            <Typography className={styles.rating}>
              {showRating()} &nbsp;
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
