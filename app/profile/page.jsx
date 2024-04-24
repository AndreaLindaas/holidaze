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
import MyVenueCard from "../_components/MyVenueCard/MyVenueCard";
export default function Profile() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [myVenues, setMyVenues] = useState([]);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const {
    name,
    accessToken,
    apiKey,
    avatar,
    bio,
    isVenueManager: venueManager,
    setName,
    setEmail,
    setBio,
    setAvatar,
    setIsVenueManager: setVenueManager,
  } = useStore();

  useEffect(() => {
    setIsVenueManager(venueManager);
    setNewAvatar(avatar);
  }, [venueManager, avatar]);
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
    const payload = {
      venueManager: isVenueManager,
      avatar: {
        url: newAvatar,
      },
      bio: bio,
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
        console.log("ting", result.data.venueManager);
        if (result.data.name) {
          //TODO: lagre profildata til store. har gjort det på login. husk venuemanager
          setName(result.data.name);
          setEmail(result.data.email);
          setBio(result.data.bio);
          setAvatar(result.data.avatar.url);
          setVenueManager(result.data.venueManager);
        }
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
          console.log("Hvilken er denne?", result);
          setMyVenues(result.data);
        })
        .catch((error) => {});
    }
  }, [accessToken, apiKey, name]);
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Avatar
            alt="profile image"
            sx={{ width: 70, height: 70 }}
            src={avatar}
          />
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
      <Link href="/venue/create">
        <span> Create Venue</span>
      </Link>
      <MyVenueCard myVenues={myVenues} />

      <Modal
        open={isEditProfileOpen}
        onClose={avatarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
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
            <label htmlFor="">Change avatar</label>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setNewAvatar(e.target.value)}
              value={newAvatar}
            />
          </div>
          <div>
            <label htmlFor="">Change bio</label>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <Button text="Save" onClick={saveProfile} />
        </Box>
      </Modal>
    </div>
  );
}
