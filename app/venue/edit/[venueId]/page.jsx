"use client";
import React, { useState } from "react";
import { TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect } from "react";
import { API_URL } from "../../../_lib/constants";
import { useParams } from "next/navigation";
import Button from "../../../_components/Button/Button";
import { useStore } from "../../../_lib/store";

export default function EditVenue() {
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [mediaUrl, setMediaUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const continents = [
    {
      value: "Europe",
      label: "Europe",
    },
    {
      value: "South America",
      label: "South America",
    },
    {
      value: "North America",
      label: "North America",
    },
    {
      value: "Africa",
      label: "Africa",
    },
    {
      value: "Asia",
      label: "Asia",
    },
    {
      value: "Australia",
      label: "Australia",
    },
  ];
  const { accessToken, apiKey } = useStore();
  useEffect(() => {
    fetch(`${API_URL}/venues/${params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // setVenue(result.data);
        setName(result.data.name);
        setDescription(result.data.description);
        // setMediaUrl(result.data.media.url);
        setPrice(result.data.price);
        setMaxGuests(result.data.maxGuests);
        setAddress(
          result.data.location.address ? result.data.location.address : ""
        );
        setCity(result.data.location.city ? result.data.location.city : "");
        setCountry(
          result.data.location.country ? result.data.location.country : ""
        );
        setContinent(
          result.data.location.continent ? result.data.location.continent : ""
        );
        setLattitude(result.data.location.lat ? result.data.location.lat : "");
        setLongitude(result.data.location.lng ? result.data.location.lng : "");
        setWifi(result.data.meta.breakfast);
        setParking(result.data.meta.parking);
        setBreakfast(result.data.meta.breakfast);
        setPets(result.data.meta.pets);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [params.venueId]);

  const submitEditForm = (e) => {
    e.preventDefault();
    console.log("halla");

    const payload = {
      name: name,
      description: description,
      // media: [
      //   {
      //     "url": "https://url.com/image.jpg",
      //     "alt": "string"
      //   }
      // ],
      price: Number(price),
      maxGuests: Number(maxGuests),

      meta: {
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
      location: {
        address: address,
        city: city,
        country: country,
        // continent:continent,
        lat: Number(lattitude),
        lng: Number(longitude),
      },
    };
    console.log("payload", payload);
    fetch(`${API_URL}/venues/${params.venueId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => {});
  };

  if (isLoading) {
    return <>loading</>;
  }

  return (
    <form onSubmit={submitEditForm}>
      <div>
        <label htmlFor="">Name*</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label htmlFor="">Description*</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          multiline
        />
      </div>
      {/* <div>
        <label htmlFor="">Media url</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setMediaUrl(e.target.value)}
        />
      </div> */}
      <div>
        <label htmlFor="">Price*</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <div>
        <label htmlFor="">Max amount of guests*</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setMaxGuests(e.target.value)}
          value={maxGuests}
        />
      </div>
      <div>
        <label htmlFor="">Address</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>
      <div>
        <label htmlFor="">city</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      <div>
        <label htmlFor="">Country</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
      </div>
      <div>
        <label htmlFor="">Continents</label>
      </div>
      <div>
        <TextField
          id="outlined-select-currency"
          select
          onChange={(e) => setContinent(e.target.value)}
          value={continent}
        >
          {continents.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <label htmlFor="">Lattitude</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setLattitude(e.target.value)}
          helperText="Must be within the range of -90 , 90 "
          value={lattitude}
        />
      </div>
      <div>
        <label htmlFor="">Longitude</label>
      </div>
      <div>
        <TextField
          variant="outlined"
          onChange={(e) => setLongitude(e.target.value)}
          helperText="Must be within the range of -180 , 180 "
          value={longitude}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Wifi"
          onChange={(e) => setWifi(e.target.checked)}
          checked={wifi}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="parking"
          onChange={(e) => setParking(e.target.checked)}
          checked={parking}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="breakfast"
          onChange={(e) => setBreakfast(e.target.checked)}
          checked={breakfast}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="pets"
          onChange={(e) => setPets(e.target.checked)}
          checked={pets}
        />
      </div>
      <Button text="save changes" />
    </form>
  );
}
