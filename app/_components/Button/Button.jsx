import React from "react";
import { useState } from "react";
import styles from "./Button.module.scss";
import { CircularProgress } from "@mui/material";

export default function Button(props) {
  const {
    className,
    isLoading,
    text,
    type,
    disabled,
    onClick,
    danger,
    icon,
    secondary,
  } = props;

  return (
    <button
      className={`${className ? className : ""} ${styles.button} ${
        danger ? styles.danger : ""
      } ${secondary ? styles.secondary : ""} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {isLoading ? <CircularProgress /> : text}
    </button>
  );
}
