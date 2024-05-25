"use client";
import React, { useEffect, useState } from "react";
import Button from "../_components/Button/Button";
import { TextField, Card, Modal, Box, Typography } from "@mui/material";
import styles from "./contact.module.scss";
import { validateEmail } from "../_lib/utils";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  console.log(message.length);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (name.length < 2) {
      setIsSendButtonDisabled(true);
      return;
    }
    if (!validateEmail(email)) {
      setIsSendButtonDisabled(true);
      return;
    }
    if (message.length < 10) {
      setIsSendButtonDisabled(true);
      return;
    }
    setIsSendButtonDisabled(false);
  }, [name, email, message]);

  const submitContact = (e) => {
    e.preventDefault();
    console.log("hallo");
  };

  const openDeleteModal = () => {
    setName("");
    setEmail("");
    setMessage("");

    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className={styles.contactContainer}>
        <h1 className="center">Contact us</h1>
        <form onSubmit={submitContact}>
          <Card className={styles.contactCard}>
            <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
              <label>Name</label>
              <TextField
                className="whiteInput"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                helperText="Must be minimun two letters"
                value={name}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
              <label>Email</label>
              <TextField
                className="whiteInput"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                helperText="Must be a valid @stud.noroff.no"
                value={email}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
              <label>Message</label>
              <TextField
                multiline
                rows={5}
                className="whiteInput"
                variant="outlined"
                onChange={(e) => setMessage(e.target.value)}
                helperText="Must be minimun ten letters"
                value={message}
              />

              <Button
                text="Send"
                narrow
                className={styles.sendButton}
                disabled={isSendButtonDisabled}
                onClick={() => openDeleteModal()}
              />
            </div>
          </Card>
        </form>
      </div>
      <Modal open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Box className="modal">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thank you for you message! We will be in touch shortly.
          </Typography>
          <span className={styles.closeButtonModal}>
            <Button text="Close" onClick={closeDeleteModal} narrow />
          </span>
        </Box>
      </Modal>
    </>
  );
}
