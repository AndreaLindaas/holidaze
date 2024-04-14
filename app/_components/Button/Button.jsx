import React from "react";
import { useState } from "react";
export default function Button(props) {
  const { text, type, disabled, name } = props;

  return (
    <button disabled={disabled} type={type}>
      {text}
    </button>
  );
}
