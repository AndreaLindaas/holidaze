import React from "react";
import { useState } from "react";
import styles from "./Button.module.scss";
export default function Button(props) {
  const { text, type, disabled, onClick, danger } = props;

  return (
    <button
      className={`${styles.button} ${danger ? styles.danger : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
