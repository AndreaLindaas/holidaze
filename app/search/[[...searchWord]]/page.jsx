"use client";
import React, { useEffect, useState } from "react";
import Search from "../../_components/Search/Search";
import useSearch from "../../_hooks/fetchSearch";
import VenueCard from "../../_components/VenueCard/VenueCard";
import Link from "next/link";
import styles from "./Search.module.scss";
import Map from "../../_components/Map/Map";
import Switch from "@mui/material/Switch";
import { TextField, MenuItem } from "@mui/material";
import { sortDataBy } from "../../_lib/utils";
import Button from "../../_components/Button/Button";

export default function SearchPage(props) {
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState();
  const [showMap, setShowMap] = useState(false);
  const [venuePositions, setVenuePositions] = useState([]);
  const [hits, setHits] = useState([]);
  const [sort, setSort] = useState("default");
  const { searchWord } = props.params;
  const { isLoading: isLoadingSearchData, data: search } =
    useSearch(searchWord);

  useEffect(() => {
    if (searchWord) {
      if (!isLoadingSearchData && search.data) {
        let searchResults = search.data;

        if (sort != "default") {
          if (sort == "priceDesc") {
            searchResults = sortDataBy(searchResults, "price", "descending");
          } else if (sort == "priceAsc") {
            searchResults = sortDataBy(searchResults, "price", "ascending");
          }
        }

        const tempMapPositionsArray = [];
        const filtered = searchResults.filter((venue) => {
          if (
            venue.location.lat &&
            venue.location.lat != 0 &&
            venue.location.lng &&
            venue.location.lng != 0
          ) {
            const venueLocation = {
              lat: venue.location.lat,
              lng: venue.location.lng,
              location: venue.location,
              name: venue.name,
              id: venue.id,
            };
            tempMapPositionsArray.push(venueLocation);
          }

          if (maxPrice > 0) {
            return venue.maxGuests >= numberOfGuests && venue.price <= maxPrice;
          }
          return venue.maxGuests >= numberOfGuests;
        });
        setHits(filtered);
        setVenuePositions(tempMapPositionsArray);
      }
    }
  }, [searchWord, numberOfGuests, maxPrice, search, sort]);

  const showSearchResults = () => {
    if (!isLoadingSearchData && !searchWord) {
      return <div>Enter search word</div>;
    }
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
  const sortingTypes = [
    {
      value: "default",
      label: "Relevance",
    },
    {
      value: "priceDesc",
      label: "Price high-low",
    },
    {
      value: "priceAsc",
      label: "Price low-high",
    },
  ];
  return (
    <div className="searchPage">
      <Search searchWord={searchWord} />
      <div className={styles.flexFilters}>
        <div>
          <TextField
            label="Number of guests"
            className="whiteInput"
            variant="outlined"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Maximum price"
            className="whiteInput"
            variant="outlined"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            select
            className="whiteInput"
            variant="outlined"
            label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortingTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {venuePositions.length > 0 && (
          <div className={styles.showMapSwitch}>
            <Switch onChange={(e) => setShowMap(e.target.checked)} /> Show map
          </div>
        )}
      </div>
      {hits.length > 0 && (
        <div className="center">
          Showing <span className="bold">{hits.length}</span> results
        </div>
      )}
      {showMap && venuePositions.length > 0 && (
        <>
          <p className="center">
            Not all venues are shown on the map due to missing coordinates.
          </p>
          <div className={styles.mapContainer}>
            <Map positions={venuePositions} />
          </div>
        </>
      )}
      <div className={styles.venueCardContainer}> {showSearchResults()}</div>
    </div>
  );
}
