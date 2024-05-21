"use client";
import React, { useEffect, useState } from "react";
import Search from "../../_components/Search/Search";
import useSearch from "../../_hooks/fetchSearch";
import VenueCard from "../../_components/VenueCard/VenueCard";
import Link from "next/link";
import styles from "./Search.module.scss";
import { TextField } from "@mui/material";
export default function SearchPage(props) {
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState();
  const [hits, setHits] = useState([]);
  const { searchWord } = props.params;
  const { isLoading: isLoadingSearchData, data: search } =
    useSearch(searchWord);

  useEffect(() => {
    if (searchWord) {
      if (!isLoadingSearchData && search.data) {
        const filtered = search.data.filter((venue) => {
          if (maxPrice > 0) {
            return venue.maxGuests >= numberOfGuests && venue.price <= maxPrice;
          }
          return venue.maxGuests >= numberOfGuests;
        });
        setHits(filtered);
      }
    }
  }, [searchWord, numberOfGuests, maxPrice, search]);

  const showSearchResults = () => {
    if (hits.length === 0 && !isLoadingSearchData) {
      return (
        <div>No hits. Please try a new search or adjust your filters.</div>
      );
    }
    return hits.map((venue) => {
      return (
        <Link href={`/venue/${venue.id}`} key={venue.id}>
          <VenueCard venue={venue} />
        </Link>
      );
    });
  };

  return (
    <div>
      <Search searchWord={searchWord} />
      <div className={styles.flexFilters}>
        <div>
          <TextField
            label="Number of guests"
            className="whiteInput"
            InputProps={{ disableUnderline: true }}
            variant="outlined"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Maximum price"
            className="whiteInput"
            InputProps={{ disableUnderline: true }}
            variant="outlined"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      {hits.length > 0 && <div>Showing {hits.length} results</div>}
      <div className={styles.venueCardContainer}> {showSearchResults()}</div>
    </div>
  );
}
