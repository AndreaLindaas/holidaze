"use client";
import React, { useEffect } from "react";
import useOtherProfile from "../../_hooks/fetchOtherProfile";
import { useStore } from "../../_lib/store";
import MyVenues from "../../_components/MyVenueCard/MyVenues";
import {
  CircularProgress,
  Card,
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
import styles from "../profile.module.scss";
import Venues from "../../venues/page";

export default function OtherProfiles(props) {
  const { accessToken, apiKey, banner } = useStore();
  const { isLoading: isLoadingOtherProfileData, data: otherProfile } =
    useOtherProfile(props.params.profileName, apiKey, accessToken);

  console.log("other profile", otherProfile);

  if (isLoadingOtherProfileData) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div>
        <div
          className={styles.banner}
          style={{ backgroundImage: `url(${otherProfile.banner.url})` }}
        >
          <div className={styles.cardContainer}>
            <Card sx={{ maxWidth: 450 }}>
              <div className={styles.avatarContainer}>
                <Avatar
                  alt="profile image"
                  sx={{ width: 70, height: 70 }}
                  src={otherProfile.avatar.url}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {otherProfile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {otherProfile.bio}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {otherProfile.venues.length > 0 && (
        <>
          <div className={styles.otherProfileRent}>
            {otherProfile.name} are renting out these
            <span className="bold"> {otherProfile.venues.length}</span> venues
          </div>
          <MyVenues myVenues={otherProfile.venues} />{" "}
        </>
      )}
    </>
  );
}