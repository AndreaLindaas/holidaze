"use client";
import React, { useEffect, useState } from "react";
import useVenues from "../_hooks/fetchAllVenues";
import Button from "../_components/Button/Button";
import Link from "next/link";
import VenueCard from "../_components/VenueCard/VenueCard";
import styles from "./Venues.module.scss";
import { CircularProgress } from "@mui/material";

export default function Venues() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { isLoading, data: venues, isError } = useVenues(limit, page);

  const loadPage = (e) => {
    setPage(e.target.dataset.page);
  };

  const showPagination = () => {
    console.log(venues);
    if (isLoading) {
      return;
    }

    let pages = [];

    for (let i = 1; i <= venues.meta.pageCount; i++) {
      pages.push(
        <span
          className={i == page ? styles.currentPage : ""}
          data-page={i}
          onClick={loadPage}
        >
          {i}
        </span>
      );
    }

    return pages;
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
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.venueCardContainer}>{showVenues()}</div>
      <div className={styles.pagination}>{showPagination()}</div>
    </div>
  );
}
