"use client";
import React, { useState } from "react";
import { TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect } from "react";
import { API_URL } from "../../../_lib/constants";
import Button from "../../../_components/Button/Button";
import { useStore } from "../../../_lib/store";
import styles from "../../../_styles/createEdit.module.scss";

export default function EditVenue(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState([]);
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
    fetch(`${API_URL}/venues/${props.params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.name);
        setDescription(result.data.description);
        setMediaUrl(result.data.media.url);
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
  }, [props.params.venueId]);

  const submitEditForm = (e) => {
    e.preventDefault();

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
    fetch(`${API_URL}/venues/${props.params.venueId}`, {
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
  const addImage = (e) => {
    e.preventDefault();
  };
  const showMediaUrl = () => {
    // return mediaUrl.map((url, i) => {
    //   return (
    //     <li key={i}>
    //       <img src={url} alt="" />
    //     </li>
    //   );
    // });
  };
  const mediaUrlChange = (e) => {
    const url = e.target.elements;
  };
  if (isLoading) {
    return <>loading</>;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={addImage}>
        <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
          <label htmlFor="">Image url</label>
          <TextField
            className="whiteInput"
            variant="outlined"
            onChange={mediaUrlChange}
          />
        </div>
        <Button text="Add" />
      </form>
      <ul>{showMediaUrl()}</ul>
      <form onSubmit={submitEditForm}>
        <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
          <label htmlFor="">Name*</label>
          <TextField
            className="whiteInput"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
          <label htmlFor="">Description*</label>
          <TextField
            className="whiteInput"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            multiline
          />
        </div>
        <div className={styles.flexAddressCity}>
          <div className={styles.inputContainer}>
            <label htmlFor="">Address</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">city</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
        </div>
        <div className={styles.flexCountryContinents}>
          <div className={styles.inputContainer}>
            <label htmlFor="">Country</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">Continents</label>
            <TextField
              className="whiteInput"
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
        </div>
        <div className={styles.flexLatLong}>
          <div className={styles.inputContainer}>
            <label htmlFor="">Lattitude</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setLattitude(e.target.value)}
              helperText="Must be within the range of -90 , 90 "
              value={lattitude}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">Longitude</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setLongitude(e.target.value)}
              helperText="Must be within the range of -180 , 180 "
              value={longitude}
            />
          </div>
        </div>
        <div className={styles.flexPriceGuests}>
          <div className={styles.inputContainer}>
            <label htmlFor="">Price*</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="">Max amount of guests*</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setMaxGuests(e.target.value)}
              value={maxGuests}
            />
          </div>
        </div>

        <FormControlLabel
          control={<Checkbox />}
          label="Wifi"
          onChange={(e) => setWifi(e.target.checked)}
          checked={wifi}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="parking"
          onChange={(e) => setParking(e.target.checked)}
          checked={parking}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="breakfast"
          onChange={(e) => setBreakfast(e.target.checked)}
          checked={breakfast}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="pets"
          onChange={(e) => setPets(e.target.checked)}
          checked={pets}
        />
        <div>
          <Button text="save changes" />
        </div>
      </form>
    </div>
  );
}
