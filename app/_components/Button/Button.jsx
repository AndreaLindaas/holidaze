import React from "react";
import { useState } from "react";
import styles from "./Button.module.scss";
export default function Button(props) {
  const { text, type, disabled, onClick } = props;

  return (
    <button disabled={disabled} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
