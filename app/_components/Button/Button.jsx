import React from "react";
import { useState } from "react";
import styles from "./Button.module.scss";

export default function Button(props) {
  const { className, text, type, disabled, onClick, danger, icon } = props;

  return (
    <button
      className={`${className} ${styles.button} ${danger ? styles.danger : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
}
