"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./success.module.scss";
import { bookingStore } from "../../_lib/store";

export default function SuccessPage() {
  const { clearBooking } = bookingStore();
  useEffect(() => {
    clearBooking();
  }, []);

  return (
    <div className={styles.successContainer}>
      <h3 className="orangeHeader">Your booking was successfully made.</h3>
      <p>
        Go to{" "}
        <Link className="orangeHeader" href="/trips">
          My trips
        </Link>
      </p>
      <p>
        or{" "}
        <Link href="/" className="orangeHeader">
          Home
        </Link>
      </p>
    </div>
  );
}
