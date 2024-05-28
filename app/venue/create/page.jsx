"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Card,
} from "@mui/material";
import Button from "../../_components/Button/Button";
import { API_URL } from "../../_lib/constants";
import { useStore } from "../../_lib/store";
import { validateUrl } from "../../_lib/utils";
import { useRouter } from "next/navigation";
import styles from "../../_styles/createEdit.module.scss";
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
  const [addImageButtonDisabled, setAddImageButtonDisabled] = useState(true);
  const [coordinatesButtonDisabled, setCoordinatesButtonDisabled] =
    useState(true);
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false);
  const [isCreatingVenue, setIsCreatingVenue] = useState(false);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

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

  // this useEffect validates coordinatesButton
  useEffect(() => {
    if (address.length < 2 || city.length < 2 || country.length < 2) {
      setCoordinatesButtonDisabled(true);
      return;
    }

    setCoordinatesButtonDisabled(false);
  }, [address, city, country]);

  // this useEffect validates create venue
  useEffect(() => {
    if (
      nameOfVenue.length < 2 ||
      description.length < 100 ||
      price > 10000 ||
      price < 1 ||
      maxAmountOfGuests > 100 ||
      maxAmountOfGuests < 1
    ) {
      setIsCreateButtonDisabled(true);
      return;
    }

    setIsCreateButtonDisabled(false);
  }, [nameOfVenue, description, price, maxAmountOfGuests]);

  const getGeolocation = async (e) => {
    e.preventDefault();
    setIsGettingCoordinates(true);
    if (address && city && country) {
      const searchAddress = encodeURI(`${address} ${city} ${country}`);
      const searchUrl = `https://nominatim.openstreetmap.org/search.php?q=${searchAddress}&polygon_geojson=1&format=jsonv2`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((result) => {
          setIsGettingCoordinates(false);

          if (result.length > 0) {
            setLattitude(result[0].lat);
            setLongitude(result[0].lon);
          }
        });
    }
  };

  const submitCreateVenue = (e) => {
    e.preventDefault();
    setIsCreatingVenue(true);
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
      .then((result) => {
        setIsCreatingVenue(false);

        if (
          result.statusCode == 401 ||
          (result.errors && result.errors.length > 0)
        ) {
          setErrors(result.errors);
        } else {
          router.push(`/venue/${result.data.id}`);
        }
      })
      .catch((error) => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
      });
  };

  const addImage = (e) => {
    e.preventDefault();
    if (tempMediaUrl) {
      const newMedia = { url: tempMediaUrl };
      const mediaArray = [...media, newMedia];
      setMedia(mediaArray);
      setTempMediaUrl("");
    }
  };
  const removeItem = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };
  return (
    <div className={styles.formContainer}>
      <h1 className="center">List your home</h1>
      <p className={styles.text}>
        Please fill out the form below with accurate and detailed information.
        This will help potential visitors understand what your venue offers and
        how it fits their needs.
      </p>
      <Card className={styles.orangeCard}>
        <ul className={`center ${styles.mediaList}`}>
          {media.map((image, i) => {
            return (
              <li key={i}>
                <img src={image.url} alt="" className={styles.image} />
                <Button text="Remove" onClick={() => removeItem(i)} narrow />
              </li>
            );
          })}
        </ul>
        <form onSubmit={addImage}>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>Media url</label>
            <TextField
              className="whiteInput mediaUrl"
              variant="outlined"
              onChange={(e) => setTempMediaUrl(e.target.value)}
              placeholder="Add media url here"
              value={tempMediaUrl}
              helperText="Maximum 8 images "
            />
          </div>
          <div className={styles.addButton}>
            <Button text="Add" disabled={addImageButtonDisabled} narrow />
          </div>
        </form>
      </Card>
      <form onSubmit={submitCreateVenue}>
        <Card className={styles.whiteCard}>
          <h3>About the venue</h3>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>Name*</label>
            <TextField
              className="whiteInput venueName"
              variant="outlined"
              onChange={(e) => setNameOfVenue(e.target.value)}
              placeholder="What will you call your venue?"
            />
          </div>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>
              Description* ({description ? description.length : 0} letters)
            </label>
            <TextField
              className="whiteInput description"
              variant="outlined"
              multiline
              rows={20}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description of the place"
              helperText="Must be minimum 100 letters "
            />
          </div>
        </Card>
        <Card className={styles.orangeCard}>
          <h3>Location</h3>
          <div className={styles.flexAddressCity}>
            <div>
              <div className={styles.inputContainer}>
                <label>Address</label>
                <TextField
                  className="whiteInput address"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label>City</label>
                <TextField
                  className="whiteInput city"
                  variant="outlined"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.flexCountryContinents}>
            <div>
              <div className={styles.inputContainer}>
                <label>Country</label>
                <TextField
                  className="whiteInput country"
                  variant="outlined"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className={styles.geoButton}>
                <Button
                  isLoading={isGettingCoordinates}
                  text="Get coordinates automatically (beta)"
                  onClick={getGeolocation}
                  disabled={coordinatesButtonDisabled}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label>Continent</label>
                <TextField
                  className="whiteInput"
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
              <div className={styles.inputContainer}>
                <label>Lattitude</label>
                <TextField
                  value={lattitude}
                  className="whiteInput"
                  variant="outlined"
                  onChange={(e) => setLattitude(e.target.value)}
                  helperText="Must be within the range of -90 , 90 "
                  type="number"
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label>Longitude</label>
                <TextField
                  value={longitude}
                  className="whiteInput"
                  variant="outlined"
                  onChange={(e) => setLongitude(e.target.value)}
                  helperText="Must be within the range of -180 , 180 "
                  type="number"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className={styles.whiteCard}>
          <h3>Pricing and details</h3>
          <div className={styles.flexPriceGuests}>
            <div>
              <div className={styles.inputContainer}>
                <label>Price*</label>
                <TextField
                  className="whiteInput price"
                  variant="outlined"
                  onChange={(e) => setPrice(e.target.value)}
                  helperText="Must be between 1 and 10 000 "
                  type="number"
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label>Max amount of guests*</label>
                <TextField
                  className="whiteInput maxGuests"
                  variant="outlined"
                  onChange={(e) => setMaxAmountOfGuests(e.target.value)}
                  helperText="Must be between 1 and 100"
                  type="number"
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
            text="Create"
            disabled={isCreateButtonDisabled || isCreatingVenue}
            isLoading={isCreatingVenue}
          />
        </div>
      </form>
    </div>
  );
}
