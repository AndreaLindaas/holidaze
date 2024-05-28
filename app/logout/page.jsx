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

  return (
    <div className="center padding">
      <h1>Bye bye!</h1>
      <div>
        <img src="/byedog.webp" className="byedog" />
      </div>
    </div>
  );
}
