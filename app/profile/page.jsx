"use client";
import React, { useEffect, useState } from "react";
import { validateUrl } from "../_lib/utils";
import { API_URL } from "../_lib/constants";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Modal,
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Link,
  CircularProgress,
} from "@mui/material";
import Button from "../_components/Button/Button";
import styles from "./profile.module.scss";
import { useStore } from "../_lib/store";
import MyVenues from "../_components/MyVenueCard/MyVenues";
import useProfile from "../_hooks/fetchProfile";
import useVenuesForProfile from "../_hooks/fetchVenuesForProfile";
import Map from "../_components/Map/Map";
export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [venuePositions, setVenuePositions] = useState([]);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [newBanner, setNewBanner] = useState("");
  const [newBio, setNewBio] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const {
    name,
    accessToken,
    apiKey,
    avatar,
    bio,
    isVenueManager: venueManager,
    banner,
    setName,
    setEmail,
    setBio,
    setAvatar,
    setIsVenueManager: setVenueManager,
    setBanner,
  } = useStore();

  const { isLoading: isLoadingProfileData, data: profile } = useProfile(
    name,
    apiKey,
    accessToken
  );
  const { isLoading: isLoadingVenuesForProfileData, data: myVenues } =
    useVenuesForProfile(name, apiKey, accessToken);

  useEffect(() => {
    if (myVenues) {
      const tempArray = [];
      myVenues.map((venue) => {
        if (venue.location.lat != 0 && venue.location.lng != 0) {
          const venueLocation = {
            lat: venue.location.lat,
            lng: venue.location.lng,
            location: venue.location,
            name: venue.name,
            id: venue.id,
          };
          tempArray.push(venueLocation);
        }
      });
      setVenuePositions(tempArray);
    }
  }, [myVenues]);
  //this useEffect validates mediUrl
  useEffect(() => {
    if (!validateUrl(newAvatar)) {
      setIsSaveButtonDisabled(true);
      return;
    }
    if (!validateUrl(newBanner)) {
      setIsSaveButtonDisabled(true);
      return;
    }
    if (newBio && newBio.length > 160) {
      setIsSaveButtonDisabled(true);
      return;
    }

    setIsSaveButtonDisabled(false);
  }, [newAvatar, newBanner, newBio]);

  useEffect(() => {
    setNewAvatar(avatar);
    setNewBanner(banner);
    setNewBio(bio);
  }, [avatar, banner, bio]);

  useEffect(() => {
    if (profile) {
      setIsVenueManager(profile.venueManager);
      setVenueManager(profile.venueManager);
    }
  }, [profile]);

  const editModalOpen = () => {
    setIsEditProfileOpen(true);
  };
  const editModalClose = () => {
    setIsEditProfileOpen(false);
  };

  const saveProfile = (event) => {
    const payload = {
      venueManager: isVenueManager,
      avatar: {
        url: newAvatar,
      },
      bio: newBio,
      banner: {
        url: newBanner,
      },
    };
    fetch(`${API_URL}/profiles/${name}`, {
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
        if (result.data.name) {
          setName(result.data.name);
          setEmail(result.data.email);
          setBio(result.data.bio);
          setAvatar(result.data.avatar.url);
          setVenueManager(result.data.venueManager);
          setBanner(result.data.banner.url);
        }
        setIsEditProfileOpen(false);
      })
      .catch((error) => {});
  };

  if (isLoadingProfileData || isLoadingVenuesForProfileData) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className={styles.cardContainer}>
          <Card sx={{ maxWidth: 450 }}>
            <div className={styles.avatarContainer}>
              <Avatar
                alt="profile image"
                sx={{ width: 70, height: 70 }}
                src={avatar}
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              {isVenueManager && (
                <Typography className={styles.venueManager}>
                  Venue manager
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {bio}
              </Typography>
            </CardContent>
            <div className={styles.editProfileButton}>
              <Button text="Edit profile" onClick={editModalOpen} />
            </div>
          </Card>
        </div>
      </div>
      {myVenues && (
        <>
          <p className="center">
            You have listed <span className="bold">{myVenues.length}</span>{" "}
            venues.
          </p>
          <MyVenues isLoggedInUsersVenues myVenues={myVenues} />
        </>
      )}
      {venuePositions.length > 0 && (
        <div className={styles.map}>
          <Map positions={venuePositions} zoom={2} />
          <p className="center">
            This map does not show venues without valid coordinates.
          </p>
        </div>
      )}
      <Modal open={isEditProfileOpen} className={styles.modal}>
        <Box className="modal">
          <Typography variant="h6" component="h2" className="orangeHeader">
            Edit profile
          </Typography>

          <Card className={styles.venueManagerContainer}>
            <Typography>
              Turn on the host switch if you want to rent out a place.
            </Typography>
            <span className={styles.host}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  checked={isVenueManager}
                  label="Venue manager"
                  onChange={(e) => setIsVenueManager(e.target.checked)}
                />
              </FormGroup>
            </span>
          </Card>
          <div className={styles.input}>
            <label htmlFor="">Change avatar</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setNewAvatar(e.target.value)}
              value={newAvatar}
              multiline
              rows={4}
              helperText="Must be a valid URL"
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="">Change banner</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setNewBanner(e.target.value)}
              value={newBanner}
              multiline
              rows={4}
              helperText="Must be a valid URL"
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="">
              Change bio ({newBio ? newBio.length : "0"} letters)
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline
              rows={4}
              onChange={(e) =>
                e.target.value.length <= 160 && setNewBio(e.target.value)
              }
              value={newBio}
              helperText="Max 160 letters"
            />
          </div>
          <div className={styles.editModalButtons}>
            <Button
              text="Save"
              narrow
              onClick={saveProfile}
              disabled={isSaveButtonDisabled}
            />
            <Button text="Close" narrow onClick={editModalClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
