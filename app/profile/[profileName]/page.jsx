"use client";
import React, { useEffect } from "react";
import useProfile from "../../_hooks/fetchProfile";
import { useStore } from "../../_lib/store";
import MyVenues from "../../_components/MyVenueCard/MyVenues";
import style from "./otherProfile.module.scss";
import Link from "next/link";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import styles from "../profile.module.scss";

export default function Profiles(props) {
  const { accessToken, apiKey, banner } = useStore();

  const { isLoading: isLoadingProfileData, data: profile } = useProfile(
    props.params.profileName,
    apiKey,
    accessToken
  );

  if (!accessToken) {
    return (
      <div className={style.notLoggedIn}>
        <Card className={style.card}>
          To see this page please{" "}
          <Link href="/login" className={style.loginText}>
            login
          </Link>
        </Card>
      </div>
    );
  }
  if (isLoadingProfileData || !profile) {
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
          style={{ backgroundImage: `url(${profile.banner.url})` }}
        >
          <div className={styles.cardContainer}>
            <Card sx={{ maxWidth: 450 }}>
              <div className={styles.avatarContainer}>
                <Avatar
                  alt="profile image"
                  sx={{ width: 70, height: 70 }}
                  src={profile.avatar.url}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.bio}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {profile.venues.length > 0 && (
        <>
          <div className={styles.profileRent}>
            {profile.name} are renting out these
            <span className="bold"> {profile.venues.length}</span> venues
          </div>
          <MyVenues myVenues={profile.venues} />{" "}
        </>
      )}
    </>
  );
}
