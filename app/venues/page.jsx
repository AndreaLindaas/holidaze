"use client";
import React, { useEffect, useState } from "react";
import useVenues from "../_hooks/fetchAllVenues";
import Button from "../_components/Button/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

  const changeLimit = (e) => {
    setLimit(e.target.value);
  };

  const showPagination = () => {
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
    <div className={styles.allVenuesContainer}>
      <h1 className="center">All venues</h1>
      <div className={styles.metadata}>
        There are <span class="bold">{venues.meta.totalCount}</span> venues on
        Holidaze!
      </div>
      <div className={styles.metadata}>
        Showing
        <Select
          className={styles.limitSelector}
          value={limit}
          onChange={changeLimit}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        venues per page.
      </div>
      <div className={styles.venueCardContainer}>{showVenues()}</div>
      <div className={styles.pagination}>{showPagination()}</div>
    </div>
  );
}
