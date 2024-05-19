"use client";
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import Button from "../_components/Button/Button";
import { AUTH_URL } from "../_lib/constants";
import { useStore } from "../_lib/store";
import Link from "next/link";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setName,
    setEmail,
    setToken,
    setAvatar,
    setBio,
    setApiKey,
    setBanner,
  } = useStore();
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
        setBanner(result.data.banner.url);

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
            window.location.href = "/";
          });
      })
      .catch((error) => {});
  };
  return (
    <div>
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
      <p>Not have an account? </p>
      <Link href="/register">
        <Button text="Register" />
      </Link>
    </div>
  );
}
