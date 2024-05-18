"use client";
import useBooking from "../../_hooks/fetchBooking";
import { useStore } from "../../_lib/store";
import SimpleSlider from "../../_components/Slider/Slider";
import { Modal, Box, Typography, Card, Avatar } from "@mui/material";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./trip.module.scss";
import Button from "../../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../../_lib/constants";
import moment from "moment";
export default function MyTrip(props) {
  const { apiKey, accessToken } = useStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isLoading, data: trip } = useBooking(
    props.params.tripId,
    apiKey,
    accessToken
  );
  console.log("trip", trip);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteTrip = () => {
    fetch(`${API_URL}/bookings/${trip.data.id}`, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    })
      .then((response) => {
        if (response.status < 300) {
          closeDeleteModal(true);
          return alert("succsess");
        }
      })

      .catch((error) => {});
  };

  if (isLoading || !trip) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.tripContainer}>
      <SimpleSlider venue={trip.data.venue} />
      <h1>Your trip at {trip.data.venue.owner.name}´s place</h1>
      <Card>
        <div className={styles.flexCheckInOut}>
          <div>
            <h3>Check-in</h3>
            <span>{moment(trip.data.dateFrom).format("MMMM Do YYYY")}</span>
          </div>
          <div>
            <h3>Check-out</h3>
            <span>{moment(trip.data.dateTo).format("MMMM Do YYYY")}</span>
          </div>
        </div>
      </Card>
      <div className={styles.flexMailRental}>
        <Card className={styles.mailCard}>
          <div className={styles.mail}>
            <Avatar src={trip.data.venue.owner.avatar.url} />
            <div>
              <p className="bold">Message your host </p>
              <a href={"mailto:" + trip.data.venue.owner.email}>
                <EmailIcon />
              </a>
            </div>{" "}
          </div>
        </Card>
        <Card className={styles.rentalCard}>
          <div className={styles.rentalContainer}>
            <div className={styles.rental}>
              <p className="bold ">See your rental</p>
              <Link href={`/venue/${trip.data.venue.id}`}>
                <span>{trip.data.venue.name}</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div>
        <div>
          <h3>Payment info</h3>
          <span className="bold">Amount paid</span>
        </div>
        <Button danger text="Cancel trip" onClick={() => openDeleteModal()} />
      </div>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box className="modal">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sure you want to cancel the trip?
          </Typography>
          <span className={styles.flexanselCloseTripButton}>
            <Button danger text="Cancel" onClick={deleteTrip} />
            <Button text="Close" onClick={closeDeleteModal} />
          </span>
        </Box>
      </Modal>
    </div>
  );
}
