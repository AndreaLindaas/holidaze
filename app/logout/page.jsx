"use client";
import React, { useEffect } from "react";
import { useStore } from "../_lib/store";

export default function Logout() {
  const { logout } = useStore();
  useEffect(() => {
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }, []);

  return <div>Logging you out.</div>;
}
