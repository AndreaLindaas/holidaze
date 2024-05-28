import React, { useEffect, useState } from "react";
import { TextField, Card } from "@mui/material";
import styles from "./Payment.module.scss";
export default function Payment(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const { isValid } = props;
  useEffect(() => {
    if (cardNumber.length != 16) {
      isValid(false);
      return;
    }
    if (date.length != 5) {
      isValid(false);
      return;
    }
    if (cvc.length != 3) {
      isValid(false);
      return;
    }
    isValid(true);
  }, [cardNumber, date, cvc]);

  return (
    <div className={styles.paymentContainer}>
      <Card className={styles.cardContent}>
        <h3>Payment</h3>
        <div className={styles.cardNumber}>
          <TextField
            value={cardNumber}
            onChange={(e) =>
              e.target.value.length <= 16 && setCardNumber(e.target.value)
            }
            className="whiteInput"
            label="Card number"
            type="number"
            helperText="16 digit number"
          />
        </div>
        <div className={styles.dateCvc}>
          <TextField
            value={date}
            onChange={(e) =>
              e.target.value.length <= 5 && setDate(e.target.value)
            }
            className="whiteInput"
            label="Expiration date"
            inputProps={{ maxLength: 5 }}
            helperText="e.g. 02/12"
          />
          <TextField
            value={cvc}
            onChange={(e) =>
              e.target.value.length <= 3 && setCvc(e.target.value)
            }
            className="whiteInput"
            label="CVC"
            type="number"
            helperText="3 digit number"
          />
        </div>
      </Card>
    </div>
  );
}
