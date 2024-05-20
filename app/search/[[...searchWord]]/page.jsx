"use client";
import React, { useEffect, useState } from "react";
import Search from "../../_components/Search/Search";
import useSearch from "../../_hooks/fetchSearch";
import VenueCard from "../../_components/VenueCard/VenueCard";
import Link from "next/link";
import styles from "./Search.module.scss";
export default function SearchPage(props) {
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState(0);

  const { searchWord } = props.params;
  const { isLoading: isLoadingSearchData, data: search } =
    useSearch(searchWord);

  const showSearchResults = () => {
    if (searchWord) {
      if (!isLoadingSearchData && search.data) {
        const filtered = search.data.filter((venue) => {
          if (maxPrice > 0) {
            return venue.maxGuests >= numberOfGuests && venue.price <= maxPrice;
          }
          return venue.maxGuests >= numberOfGuests;
        });

        if (filtered.length === 0) {
          return (
            <div>No hits. Please try a new search or adjust your filters.</div>
          );
        }

        return filtered.map((venue) => {
          return (
            <Link href={`/venue/${venue.id}`} key={venue.id}>
              <VenueCard venue={venue} />
            </Link>
          );
        });
      }
    }
  };
  return (
    <div>
      <Search searchWord={searchWord} />
      <div className={styles.venueCardContainer}> {showSearchResults()}</div>
    </div>
  );
}
