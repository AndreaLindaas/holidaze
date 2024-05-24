"use client";
import useBooking from "../../_hooks/fetchBooking";
import { useEffect } from "react";
import { useStore } from "../../_lib/store";
import SimpleSlider from "../../_components/Slider/Slider";
import { Modal, Box, Typography, Card, Avatar } from "@mui/material";
import Link from "next/link";
import styles from "./trip.module.scss";
import Button from "../../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../../_lib/constants";
import moment from "moment";
import Map from "../../_components/Map/Map";
export default function MyTrip(props) {
  const { apiKey, accessToken } = useStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [latLng, setLatLng] = useState([]);

  const { isLoading, data: trip } = useBooking(
    props.params.tripId,
    apiKey,
    accessToken
  );

  useEffect(() => {
    if (
      !isLoading &&
      trip &&
      !!trip.data.venue.location.lat &&
      !!trip.data.venue.location.lng
    ) {
      setLatLng([trip.data.venue.location.lat, trip.data.venue.location.lng]);
    } else if (
      !isLoading &&
      trip &&
      !!trip.data.venue.location.address &&
      !!trip.data.venue.location.city &&
      !!trip.data.venue.location.country
    ) {
      const address = encodeURI(
        `${trip.data.venue.location.address} ${trip.data.venue.location.city} ${trip.data.venue.location.country}`
      );
      const searchUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=jsonv2`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((result) => {
          if (result.length > 0) {
            setLatLng([result[0].lat, result[0].lon]);
          }
        });
    }
  }, [trip]);

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
            <div className={styles.messageHost}>
              <a
                href={"mailto:" + trip.data.venue.owner.email}
                className="bold"
              >
                Message your host
              </a>
            </div>
          </div>
        </Card>
        <Card className={styles.rentalCard}>
          <div className={styles.rentalContainer}>
            <div className={styles.rental}>
              <p className="bold ">See your venue</p>
              <Link href={`/venue/${trip.data.venue.id}`}>
                <span>{trip.data.venue.name}</span>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div>
        {trip.data.venue.location.address &&
        trip.data.venue.location.city &&
        trip.data.venue.location.country ? (
          <div>
            <p>
              <span className="bold">Address: </span>
              {trip.data.venue.location.address},{" "}
              {trip.data.venue.location.city},{" "}
              {trip.data.venue.location.country}
            </p>
          </div>
        ) : (
          <div className="bold"> Contact the host for address</div>
        )}
        <div>
          <div className="bold">Number of nights</div>
          <div className="bold">Price per night</div>
          <div className="bold">Total price</div>
        </div>
        <div className={styles.cancelTripButton}>
          <Button danger text="Cancel trip" onClick={() => openDeleteModal()} />
        </div>
        {latLng.length == 2 && (
          <Map position={latLng} zoom={8} location={trip.data.venue.location} />
        )}
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
