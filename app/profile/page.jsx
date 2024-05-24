"use client";

import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import Button from "../_components/Button/Button";
import styles from "./profile.module.scss";
import { useStore } from "../_lib/store";
import MyVenues from "../_components/MyVenueCard/MyVenues";
export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [myVenues, setMyVenues] = useState([]);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [newBanner, setNewBanner] = useState("");
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

  useEffect(() => {
    setNewAvatar(avatar);
    setNewBanner(banner);
  }, [avatar, banner]);
  useEffect(() => {
    if (apiKey && accessToken) {
      fetch(`${API_URL}/profiles/${name}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setIsVenueManager(result.data.venueManager);
          setVenueManager(result.data.venueManager);
        });
    }
  }, [apiKey, accessToken]);

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
      bio: bio,
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

  useEffect(() => {
    if (accessToken && apiKey && name) {
      fetch(`${API_URL}/profiles/${name}/venues`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setMyVenues(result.data);
        })
        .catch((error) => {});
    }
  }, [accessToken, apiKey, name]);
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

      <p>You have listed {myVenues.length} venues.</p>
      <MyVenues isLoggedInUsersVenues myVenues={myVenues} />
      <Modal
        open={isEditProfileOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                  label="Host"
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
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="">Change banner</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setNewBanner(e.target.value)}
              value={newBanner}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="">Change bio</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className={styles.editModalButtons}>
            <Button text="Save" onClick={saveProfile} />
            <Button text="close" onClick={editModalClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
