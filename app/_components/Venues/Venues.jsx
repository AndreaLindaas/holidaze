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
      <div className={styles.explore}>EXPLORE</div>
      <div className={styles.seeMoreButton}>
        <Button text="See all venues" onClick={seeAllVenues} />
      </div>
    </div>
  );
}
