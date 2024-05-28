"use client";
import useBooking from "../../_hooks/fetchBooking";
import useVenue from "../../_hooks/fetchVenue";
import { useEffect } from "react";
import { useStore, bookingStore } from "../../_lib/store";
import SimpleSlider from "../../_components/Slider/Slider";
import { Modal, Box, Typography, Card, Avatar, TextField } from "@mui/material";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import styles from "./trip.module.scss";
import Button from "../../_components/Button/Button";
import { useState } from "react";
import { API_URL } from "../../_lib/constants";
import moment from "moment";
import Map from "../../_components/Map/Map";
import { daysBetween } from "../../_lib/utils";
import MyBookingCalendar from "../../_components/MyBookingCalendar/MyBookingCalendar";
import { useRouter } from "next/navigation";

export default function MyTrip(props) {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const { apiKey, accessToken } = useStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [latLng, setLatLng] = useState(null);
  const [newAmountOfGuests, setNewAmountOfGuests] = useState(0);
  const { setStartDate, setEndDate, startDate, endDate } = bookingStore();
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const { isLoading, data: trip } = useBooking(
    props.params.tripId,
    apiKey,
    accessToken
  );
  const { isLoading: isLoadingVenue, data: venue } = useVenue(
    trip ? trip.data.venue.id : null
  );
  useEffect(() => {
    if (
      !isLoadingVenue &&
      venue &&
      !!venue.location.lat &&
      !!venue.location.lng
    ) {
      setLatLng({
        lat: venue.location.lat,
        lng: venue.location.lng,
        location: venue.location,
      });
    } else if (
      !isLoading &&
      venue &&
      !!venue.location.address &&
      !!venue.location.city &&
      !!venue.location.country
    ) {
      const address = encodeURI(
        `${venue.location.address} ${venue.location.city} ${venue.location.country}`
      );
      const searchUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=jsonv2`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((result) => {
          if (result.length > 0) {
            setLatLng({
              lat: result[0].lat,
              lng: result[0].lon,
              location: venue.location,
            });
          }
        });
    }

    if (!isLoading && trip) {
      setNewAmountOfGuests(trip.data.guests);
      setStartDate(trip.data.dateFrom);
      setEndDate(trip.data.dateTo);
    }
  }, [trip]);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
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
          router.push("/trips");
        }
      })

      .catch((error) => {});
  };

  const saveChangesToEditTrip = () => {
    setIsSaving(true);

    console.log("hallloooo");
    const payload = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: Number(newAmountOfGuests),
    };
    fetch(`${API_URL}/bookings/${trip.data.id}`, {
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
        setIsSaving(false);

        if (
          result.statusCode == 401 ||
          (result.errors && result.errors.length > 0)
        ) {
          setErrors(result.errors);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
        setIsSaving(false);
      });
  };

  const numberOfNights = () => {
    return daysBetween(trip.data.dateFrom, trip.data.dateTo);
  };
  const numberOfNewNights = () => {
    if (startDate && endDate) {
      return daysBetween(startDate, endDate);
    }
    return 0;
  };
  useEffect(() => {
    if (trip) {
      if (
        newAmountOfGuests > trip.data.venue.maxGuests ||
        newAmountOfGuests < 1
      ) {
        setSaveButtonDisabled(true);
        return;
      }

      if (!startDate || !endDate) {
        setSaveButtonDisabled(true);
        return;
      }

      setSaveButtonDisabled(false);
    }
  }, [newAmountOfGuests, startDate, endDate]);

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
      <div className={styles.flexMailRental}>
        <Card className={styles.infoCard}>
          {trip.data.venue.location.address &&
          trip.data.venue.location.city &&
          trip.data.venue.location.country ? (
            <div>
              <p>
                <span>Address: </span>
                {trip.data.venue.location.address},{" "}
                {trip.data.venue.location.city},{" "}
                {trip.data.venue.location.country}
              </p>
            </div>
          ) : (
            <div> Contact the host for address</div>
          )}
        </Card>
        <Card className={styles.infoCard}>
          <div className={styles.tripData}>
            <div>
              <span>Visitors:</span>

              <span className="bold"> {trip.data.guests}</span>
            </div>
            <div>
              <span>Number of nights:</span>
              <span className="bold"> {numberOfNights()}</span>
            </div>
            <div>
              <span> Price per night:</span>
              <span className="bold">{trip.data.venue.price},-</span>
            </div>
            <div>
              <span> Total price:</span>
              <span className="bold">
                {numberOfNights() * trip.data.venue.price},-
              </span>
            </div>
          </div>
        </Card>
      </div>
      {moment(trip.data.dateFrom).isAfter() ? (
        <div className={styles.cancelTripButton}>
          <Button
            narrow={!isDesktop}
            danger
            text="Cancel trip"
            onClick={() => openDeleteModal()}
          />
          <Button
            narrow={!isDesktop}
            text="Edit trip"
            onClick={() => openEditModal()}
          />
        </div>
      ) : (
        <p className="center">
          You cannot change dates or number of guests for this trip, since it
          has started. For any inquiries please contact the venue manager.
        </p>
      )}

      {latLng && latLng.lat && latLng.lng && (
        <Map positions={[latLng]} zoom={8} />
      )}

      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box className="modal">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sure you want to cancel the trip?
          </Typography>
          <span className={styles.flexanselCloseTripButton}>
            <Button
              narrow={!isDesktop}
              danger
              text="Cancel"
              onClick={deleteTrip}
            />
            <Button
              narrow={!isDesktop}
              text="Close"
              onClick={closeDeleteModal}
            />
          </span>
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={closeEditModal}
        className={styles.editTripModal}
      >
        <Box className="modal">
          <Typography variant="h5" component="h2" className="orangeHeader">
            Edit trip
          </Typography>
          <TextField
            label="Guests?"
            className="whiteInput"
            variant="outlined"
            onChange={(e) => setNewAmountOfGuests(e.target.value)}
            value={newAmountOfGuests}
            type="number"
            helperText={`This palce allows maximum ${trip.data.venue.maxGuests} guests`}
          />
          <div className={styles.travelDates}>
            <Typography variant="h6" gutterBottom>
              Travel dates
            </Typography>
            <MyBookingCalendar venue={venue} hideBookButton />
          </div>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <div>
            <span>Number of nights:</span>
            <span className="bold"> {numberOfNights()}</span>
          </div>
          <div>
            <span> Price per night:</span>
            <span className="bold">{trip.data.venue.price},-</span>
          </div>
          <div>
            <span> Total price:</span>
            <span className="bold">
              {numberOfNewNights() * trip.data.venue.price},-
            </span>
          </div>
          <span className={styles.flexanselCloseTripButton}>
            <Button
              text="Save"
              narrow
              onClick={saveChangesToEditTrip}
              isLoading={isSaving}
              disabled={saveButtonDisabled}
            />
            <Button text="Close" narrow onClick={closeEditModal} />
          </span>
        </Box>
      </Modal>
    </div>
  );
}
