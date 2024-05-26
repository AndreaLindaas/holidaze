"use client";
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import { useEffect } from "react";
import { API_URL } from "../../../_lib/constants";
import { validateUrl } from "../../../_lib/utils";
import Button from "../../../_components/Button/Button";
import { useStore } from "../../../_lib/store";
import styles from "../../../_styles/createEdit.module.scss";

export default function EditVenue(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [tempMediaUrl, setTempMediaUrl] = useState("");
  const [price, setPrice] = useState(-1);
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
  const [addImageButtonDisabled, setAddImageButtonDisabled] = useState(true);
  const [isSaveChangesDisabled, setIsSaveChangesDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isEditVenue, setIsEditVenue] = useState(false);

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

  // this useEffect validates mediUrl
  useEffect(() => {
    if (!validateUrl(tempMediaUrl)) {
      setAddImageButtonDisabled(true);
      return;
    }

    if (media.length >= 8) {
      setAddImageButtonDisabled(true);
      return;
    }

    setAddImageButtonDisabled(false);
  }, [tempMediaUrl, media]);

  // this useEffect validates edit venue
  useEffect(() => {
    if (
      name.length < 2 ||
      description.length < 100 ||
      price > 10000 ||
      price < 1 ||
      maxGuests > 100 ||
      maxGuests < 1
    ) {
      setIsSaveChangesDisabled(true);
      return;
    }

    setIsSaveChangesDisabled(false);
  }, [name, description, price, maxGuests]);

  useEffect(() => {
    fetch(`${API_URL}/venues/${props.params.venueId}`)
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.name);
        setDescription(result.data.description);
        setMedia(result.data.media);
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
      media: media,
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
        continent: continent,
        lat: Number(lattitude),
        lng: Number(longitude),
      },
    };
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
      .then((result) => {
        setIsEditVenue(false);

        if (
          result.statusCode == 401 ||
          (result.errors && result.errors.length > 0)
        ) {
          setErrors(result.errors);
        } else {
          // router.push(`/venue/${result.data.id}`);
        }
      })
      .catch((error) => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
      });
  };
  const addImage = (e) => {
    e.preventDefault();
    const newMedia = { url: tempMediaUrl };
    const mediaArray = [...media, newMedia];
    setMedia(mediaArray);
    setTempMediaUrl("");
  };
  const removeItem = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };
  const showImages = () => {
    return media.map((image, i) => {
      return (
        <li key={i}>
          <img
            src={image.url}
            alt="image of the venue"
            className={styles.image}
          />
          <Button text="Remove" onClick={() => removeItem(i)} narrow />
        </li>
      );
    });
  };
  const mediaUrlChange = (e) => {
    setTempMediaUrl(e.target.value);
  };

  if (isLoading) {
    return <>loading</>;
  }

  return (
    <div className={styles.formContainer}>
      <h1 className="center">Edit your venue</h1>
      <p className={styles.text}>
        Please fill out the form below with accurate and detailed information.
        This will help potential visitors understand what your venue offers and
        how it fits their needs.
      </p>
      <Card className={styles.orangeCard}>
        <ul className={`center ${styles.mediaList}`}>{showImages()}</ul>
        <form onSubmit={addImage}>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label htmlFor="">Media url</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={mediaUrlChange}
              value={tempMediaUrl}
              helperText="Maximum 8 images "
            />
            <Button text="Add" narrow disabled={addImageButtonDisabled} />
          </div>
        </form>
      </Card>
      <form onSubmit={submitEditForm}>
        <Card className={styles.whiteCard}>
          {" "}
          <h3>About the venue</h3>
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
            <label htmlFor="">Description*({description.length} letters)</label>
            <TextField
              className="whiteInput"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              multiline
              rows={20}
              helperText="Must be minimum 100 letters "
            />
          </div>{" "}
        </Card>{" "}
        <Card className={styles.orangeCard}>
          <h3>Location</h3>
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
                type="number"
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
                type="number"
                value={longitude}
              />
            </div>
          </div>
        </Card>{" "}
        <Card className={styles.whiteCard}>
          {" "}
          <h3>Pricing and details</h3>
          <div className={styles.flexPriceGuests}>
            <div className={styles.inputContainer}>
              <label htmlFor="">Price*</label>
              <TextField
                className="whiteInput"
                variant="outlined"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                helperText="Must be between 1 and 10 000 "
                type="number"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="">Max amount of guests*</label>
              <TextField
                className="whiteInput"
                variant="outlined"
                onChange={(e) => setMaxGuests(e.target.value)}
                value={maxGuests}
                helperText="Must be between 1 and 100"
                type="number"
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
        </Card>
        {errors.length > 0 && (
          <div>
            <ul>
              {errors.map((e, i) => (
                <li key={i}>{e.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.button}>
          <Button
            text="Save changes"
            disabled={isSaveChangesDisabled}
            isLoading={isEditVenue}
          />
        </div>
      </form>
    </div>
  );
}
