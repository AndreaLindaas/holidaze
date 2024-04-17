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
} from "@mui/material";
import Button from "../_components/Button/Button";
import styles from "./profile.module.scss";
import { useStore } from "../_lib/store";
export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const {
    name,
    accessToken,
    apiKey,
    avatar,
    isVenueManager: venueManager,
  } = useStore();

  useEffect(() => {
    setIsVenueManager(venueManager);
  }, []);
  // bruk ved henting av andre profiler
  //   useEffect(() => {
  //     fetch(`${API_URL}/profiles/${name}`, {
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setProfile(result);
  //         console.log("the result", result);
  //       });
  //   }, []);

  const avatarModalOpen = () => {
    setIsEditProfileOpen(true);
  };
  const avatarModalClose = () => {
    setIsEditProfileOpen(false);
  };

  const saveProfile = (event) => {
    console.log("avatar ting er vanskelig", newAvatar);

    const payload = {
      venueManager: isVenueManager,
      avatar: {
        url: newAvatar,
      },
    };
    console.log("payload", payload);
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
        console.log("ting", result);
        if (result.name) {
          //TODO: lagre profildata til store. har gjort det på login. husk venuemanager
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Avatar alt="profile image" sx={{ width: 70, height: 70 }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Noe mer her??
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button text="Edit profile" onClick={avatarModalOpen} />
      </Card>

      <Modal
        open={isEditProfileOpen}
        onClose={avatarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.editProfileModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit profile
          </Typography>
          <Typography>Is a venue manager</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              checked={isVenueManager}
              label="Label"
              onChange={(e) => setIsVenueManager(e.target.checked)}
            />
          </FormGroup>
          <div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onChange={(e) => setNewAvatar(e.target.value)}
            />
          </div>
          <Button text="Save" onClick={saveProfile} />
        </Box>
      </Modal>
    </div>
  );
}
