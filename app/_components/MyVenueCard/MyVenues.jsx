import React from "react";
import MyVenueCard from "./MyVenueCard";
export default function MyVenues(props) {
  const { myVenues } = props;

  const showMyVenueCards = () => {
    return myVenues.map((venue) => {
      return <MyVenueCard key={venue.id} venue={venue} />;
    });
  };

  return <div>{showMyVenueCards()}</div>;
}
