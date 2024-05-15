import React from "react";
import MyVenueCard from "./MyVenueCard";
import Link from "next/link";
export default function MyVenues(props) {
  const { myVenues } = props;

  const showMyVenueCards = () => {
    return myVenues.map((venue) => {
      return <MyVenueCard key={venue.id} venue={venue} />;
    });
  };

  return <div className="venueCards1">{showMyVenueCards()}</div>;
}
