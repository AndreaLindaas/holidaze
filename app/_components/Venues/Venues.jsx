"use client";
import { API_URL } from "../../_lib/constants";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import VenueCard from "../VenueCard/VenueCard";
import Link from "next/link";
import styles from "./Venues.module.scss";
import Button from "../Button/Button";
import useVenues from "../../_hooks/fetchAllVenues";
import { useRouter } from "next/navigation";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
export default function Venues() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { isLoading, data: venues, isError } = useVenues(limit, page);

  const seeAllVenues = () => {
    router.push("/venues");
  };

  const showVenues = () => {
    if (!venues) {
      return <p>Could not fetch venues</p>;
    }

    return venues.data.map((venue) => {
      return (
        <Link href={`/venue/${venue.id}`} key={venue.id}>
          <VenueCard venue={venue} />
        </Link>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong. Please try again.</div>;
  }
  return (
    <div>
      <div className={styles.venueCardContainer}>{showVenues()}</div>
      <div className={styles.seeMoreButton}>
        <Button text="See all venues" onClick={seeAllVenues} />
      </div>
      <div className={styles.explore}>
        <h2 className="center">Explore</h2>
        <div className={styles.exploreContent}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 160 }}
              image="/new-zealand.jpg"
              title="image of a venue in new zealand"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                New Zealand
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Relaxing in New Zealand is a serene escape into nature`s beauty,
                from the tranquil beaches to the stunning mountains and lush
                forests.{" "}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 160 }}
              image="/chile.jpg"
              title="image of a venue in chile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Relaxing in Chile offers a diverse array of experiences, from
                the tranquil beaches of the Pacific coast to the serene beauty
                of the Andes mountains.{" "}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 160 }}
              image="/greece.jpg"
              title="image of a venue in greece"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Greece{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Relaxing in Greece is a blissful experience, blending stunning
                landscapes, rich history, and warm hospitality.{" "}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
