"use client";
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../_components/Button/Button";
import { AUTH_URL } from "../_lib/constants";
import { useStore } from "../_lib/store";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setName, setEmail, setToken, setAvatar, setBio, setApiKey } =
    useStore();
  const submitForm = (event) => {
    event.preventDefault();

    const data = {
      email: loginEmail,
      password,
    };
    fetch(`${AUTH_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setToken(result.data.accessToken);
        setBio(result.data.bio);
        setAvatar(result.data.avatar.url);

        fetch(`${AUTH_URL}/create-api-key`, {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${result.data.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setApiKey(result.data.key);
          });
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
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
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
