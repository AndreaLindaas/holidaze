"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";
import { API_URL } from "../_lib/constants";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
export default function Trips() {
  const { name, accessToken, apiKey } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     fetch(`${API_URL}/profiles/${name}/bookings?_venues=true`, {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization: `Bearer ${accessToken}`,
  //         "X-Noroff-API-Key": apiKey,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setIsLoading(false);

  //         console.log("result from bookings", result);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching product:", error);
  //       });
  //   }, [name, accessToken, apiKey]);

  useEffect(() => {
    if (name && accessToken && apiKey) {
      fetch(`${API_URL}/profiles/${name}/bookings?_venue=true`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setIsLoading(false);
          console.log("the result", result);
        });
    }
  }, [apiKey]);

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
  return <div>Trips</div>;
}
