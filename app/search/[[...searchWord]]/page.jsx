"use client";
import React, { useEffect } from "react";
import Search from "../../_components/Search/Search";
import useSearch from "../../_hooks/fetchSearch";
import VenueCard from "../../_components/VenueCard/VenueCard";
export default function SearchPage(props) {
  const { searchWord } = props.params;
  const { isLoading: isLoadingSearchData, data: search } =
    useSearch(searchWord);

  const showSearchResults = () => {
    if (searchWord) {
      if (!isLoadingSearchData && search.data) {
        return search.data.map((venue, i) => {
          return (
            <div key={venue.id}>
              <VenueCard venue={venue} />
            </div>
          );
        });
      }
    }
  };
  return (
    <div>
      <Search searchWord={searchWord} />
      <div> {showSearchResults()}</div>
    </div>
  );
}
