"use client";
import React, { useState } from "react";
import Button from "../_components/Button/Button";
import { TextField, Card } from "@mui/material";
import styles from "./contact.module.scss";
export default function Contact() {
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const submitContact = (e) => {
    e.preventDefault();
    console.log("hallo");
  };
  return (
    <div className={styles.contactContainer}>
      <h1 className="center">Contact us</h1>
      <form onSubmit={submitContact}>
        <Card className={styles.contactCard}>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>Name</label>
            <TextField className="whiteInput" variant="outlined" />
          </div>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>Email</label>
            <TextField className="whiteInput" variant="outlined" />
          </div>
          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label>Message</label>
            <TextField
              multiline
              rows={5}
              className="whiteInput"
              variant="outlined"
            />

            <Button
              text="Send"
              narrow
              className={styles.sendButton}
              disabled={isSendButtonDisabled}
            />
          </div>
        </Card>
      </form>
    </div>
  );
}
