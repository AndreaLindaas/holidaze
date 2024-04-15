"use client";
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../_components/Button/Button";
import { API_URL } from "../_lib/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (event) => {
    event.preventDefault();
    console.log(email);
    const data = {
      email,
      password,
    };
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("email", result.email);
        localStorage.setItem("avatar", result.avatar);
        localStorage.setItem("name", result.name);
      })
      .catch((error) => {});
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="">Email</label>
      </div>
      <div>
        <TextField
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
      </div>
      <div>
        <TextField
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button text="login" />
    </form>
  );
}
