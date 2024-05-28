import React from "react";
import { TextField, Card } from "@mui/material";
import styles from "./Payment.module.scss";
export default function Payment() {
  const handleNumericInput = (event) => {};
  return (
    <div className={styles.paymentContainer}>
      <Card className={styles.cardContent}>
        <div className={styles.cardNumber}>
          <TextField className="whiteInput" label="Card number" />
        </div>
        <div className={styles.dateCvc}>
          <TextField
            className="whiteInput"
            label="Expiration date"
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            className="whiteInput"
            label="CVC"
            inputProps={{ maxLength: 3 }}
          />
        </div>
      </Card>
    </div>
  );
}
