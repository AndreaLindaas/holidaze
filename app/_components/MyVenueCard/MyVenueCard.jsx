import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Button from "../Button/Button";
export default function MyVenueCard(props) {
  const { myVenues } = props;
  console.log("MYYYYYYYY", myVenues);
  const showMyVenueCards = () => {
    return myVenues.map((venue) => {
      const showImage = () => {
        if (venue.media && venue.media.length > 0) {
          return (
            <CardMedia
              component="img"
              height="140"
              image={venue.media[0].url}
            />
          );
        } else {
          return <div>No Image</div>;
        }
      };
      return (
        <Card sx={{ maxWidth: 345 }} key={venue.id}>
          <CardActionArea>
            {showImage()}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {venue.name}
              </Typography>
            </CardContent>
            <Button text="Edit" />
          </CardActionArea>
        </Card>
      );
    });
  };

  return <div>{showMyVenueCards()}</div>;
}
