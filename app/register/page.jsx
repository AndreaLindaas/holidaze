"use client";
import React, { use, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "../_components/Button/Button";
import { API_URL } from "../_lib/constants";
import { validateEmail, validateName } from "../_lib/utils";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);

  useEffect(() => {
    if (!validateName(name) || name.length < 2) {
      setSignupButtonDisabled(true);
      return;
    }

    if (!validateEmail(email)) {
      setSignupButtonDisabled(true);
      return;
    }

    if (password.length < 8 || password != confirmPassword) {
      setSignupButtonDisabled(true);
      return;
    }

    setSignupButtonDisabled(false);
  }, [name, email, password, confirmPassword]);

  const submitForm = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="name">Name</label>
      </div>
      <div>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          variant="outlined"
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
      </div>
      <div>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          variant="outlined"
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
      </div>
      <div>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="">Confirm Password</label>
      </div>
      <div>
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
        />
      </div>

      <Button disabled={signupButtonDisabled} text="Sign up" type="submit" />
    </form>
  );
}
