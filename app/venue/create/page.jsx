"use client";
import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import Button from "../../_components/Button/Button";
import { API_URL } from "../../_lib/constants";
import { useStore } from "../../_lib/store";
import styles from "./create.module.scss";
export default function CreateVenue() {
  const { accessToken, apiKey } = useStore();
  const [nameOfVenue, setNameOfVenue] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [tempMediaUrl, setTempMediaUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [maxAmountOfGuests, setMaxAmountOfGuests] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("Europe");
  const [lattitude, setLattitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
  const submitCreateListing = (e) => {
    e.preventDefault();
    const payload = {
      name: nameOfVenue,
      description: description,
      media: media,
      price: Number(price),
      maxGuests: Number(maxAmountOfGuests),
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
        continent: continent,
        lat: Number(lattitude),
        lng: Number(longitude),
      },
    };

    fetch(`${API_URL}/venues`, {
      method: "POST",
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
  const addImage = (e) => {
    e.preventDefault();
    const newMedia = { url: tempMediaUrl };
    const mediaArray = [...media, newMedia];
    setMedia(mediaArray);
  };
  return (
    <div className={styles.formContainer}>
      <p className={styles.text}>
        Please fill out the form below with accurate and detailed information.
        This will help potential visitors understand what your venue offers and
        how it fits their needs.
      </p>
      <div className="center">
        {media.map((image, i) => {
          console.log(image);
          return (
            <img src={image.url} key={i} alt="" className={styles.image} />
          );
        })}
      </div>
      <form onSubmit={addImage}>
        <div>
          <label htmlFor="">Media url</label>
        </div>
        <div>
          <TextField
            variant="outlined"
            onChange={(e) => setTempMediaUrl(e.target.value)}
            placeholder="Add media url here"
          />
        </div>
        <Button text="Add" />
      </form>
      <form onSubmit={submitCreateListing}>
        <div>
          <label htmlFor="">Name*</label>
        </div>
        <div>
          <TextField
            variant="outlined"
            onChange={(e) => setNameOfVenue(e.target.value)}
            placeholder="What will you call your rental?"
          />
        </div>
        <div>
          <label htmlFor="">Description*</label>
        </div>
        <div>
          <TextField
            variant="outlined"
            multiline
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a dercription of the place"
          />
        </div>
        <div className={styles.flexAddressCity}>
          <div>
            <div>
              <label htmlFor="">Address</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">city</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.flexCountryContinents}>
          <div>
            <div>
              <label htmlFor="">Country</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Continents</label>
            </div>
            <div>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="Europe"
                onChange={(e) => setContinent(e.target.value)}
              >
                {continents.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className={styles.flexLatLong}>
          <div>
            <div>
              <label htmlFor="">Lattitude</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setLattitude(e.target.value)}
                helperText="Must be within the range of -90 , 90 "
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Longitude</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setLongitude(e.target.value)}
                helperText="Must be within the range of -180 , 180 "
              />
            </div>
          </div>
        </div>
        <div className={styles.flexPriceGuests}>
          <div>
            <div>
              <label htmlFor="">Price*</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Max amount of guests*</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                onChange={(e) => setMaxAmountOfGuests(e.target.value)}
              />
            </div>
          </div>
        </div>

        <FormControlLabel
          control={<Checkbox />}
          label="Wifi"
          onChange={(e) => setWifi(e.target.checked)}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="parking"
          onChange={(e) => setParking(e.target.checked)}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="breakfast"
          onChange={(e) => setBreakfast(e.target.checked)}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="pets"
          onChange={(e) => setPets(e.target.checked)}
        />
        <div>
          <Button text="Create" />
        </div>
      </form>
    </div>
  );
}
