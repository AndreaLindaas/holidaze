"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";

export default function Logout() {
  useEffect(() => {
    // localStorage.clear();
    window.location.href = "/";
  });

  return <div>Logging you out.</div>;
}
