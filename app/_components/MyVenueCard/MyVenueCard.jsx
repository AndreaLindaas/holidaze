import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import Button from "../Button/Button";
import Link from "next/link";
import styles from "./MyVenueCard.module.scss";
import { API_URL } from "../../_lib/constants";
import { useStore } from "../../_lib/store";
export default function MyVenueCard(props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { accessToken, apiKey } = useStore();

  const { venue } = props;

  const showImage = () => {
    if (venue.media && venue.media.length > 0) {
      return (
        <CardMedia component="img" height="140" image={venue.media[0].url} />
      );
    } else {
      return <div>No Image</div>;
    }
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteVenue = () => {
    console.log("tralala");
    fetch(`${API_URL}/venues/${venue.id}`, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    })
      .then((response) => {
        if (response.status < 300) {
          window.location.reload();
        }
      })

      .catch((error) => {});
  };

  return (
    <div>
      <div>
        <Card sx={{ maxWidth: 345 }} key={venue.id}>
          <CardActionArea>
            {showImage()}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {venue.name}
              </Typography>
            </CardContent>
          </CardActionArea>{" "}
          <Link href={`/venue/edit/${venue.id}`}>
            <Button text="Edit" />
          </Link>
          <Button text="Delete" onClick={() => openDeleteModal()} />
        </Card>
      </div>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box className="modal">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sure you want to delete the venue?{" "}
          </Typography>
          <Button text="Delete" onClick={deleteVenue} />
          <Button text="Close" onClick={closeDeleteModal} />
        </Box>
      </Modal>
    </div>
  );
}
