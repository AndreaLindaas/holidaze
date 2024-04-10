"use client";
// import { API_URL } from "@/app/_lib/constants";
import React, { useEffect, useState } from "react";

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetch("https://api.noroff.dev/api/v1/holidaze/venues")
      .then((response) => response.json())
      .then((result) => {
        setVenues(result);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, []);
  console.log(venues);
  const showVenues = () => {
    return venues.map((venue) => {
      return <div key={venue.id}>{venue.name}</div>;
    });
  };
  //   if (showError) {
  //     return <div className="error-message">Problem with fetching Venues.</div>;
  //   }
  return <div>{showVenues()}</div>;
}
