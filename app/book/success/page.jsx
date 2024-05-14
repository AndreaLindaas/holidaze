import React from "react";
import Link from "next/link";
import styles from "./success.module.scss";

export default function SuccessPage() {
  return (
    <div className={styles.successContainer}>
      <h3 className="orangeHeader">Your booking was successfully made.</h3>
      <p>
        Return to your{" "}
        <Link className="orangeHeader" href="/trips">
          Trips
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
