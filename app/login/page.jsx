"use client";
import React, { useEffect, useState } from "react";
import { TextField, Card } from "@mui/material";
import Button from "../_components/Button/Button";
import { AUTH_URL } from "../_lib/constants";
import { useStore } from "../_lib/store";
import Link from "next/link";
import styles from "../_styles/loginRegister.module.scss";
import { validateEmail, validateName } from "../_lib/utils";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {
    setName,
    setEmail,
    setToken,
    setAvatar,
    setBio,
    setApiKey,
    setBanner,
    setIsVenueManager,
  } = useStore();

  useEffect(() => {
    if (!validateEmail(loginEmail)) {
      setRegisterButtonDisabled(true);
      return;
    }
    if (password.length < 8) {
      setRegisterButtonDisabled(true);
      return;
    }
    setRegisterButtonDisabled(false);
  }, [loginEmail, password]);

  const submitForm = (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
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
        if (
          result.statusCode == 401 ||
          (result.errors && result.errors.length > 0)
        ) {
          setErrors(result.errors);
          setIsLoggingIn(false);
        } else {
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
        }
      })
      .catch(() => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
        setIsLoggingIn(false);
      });
  };
  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <h1 className="center">Login</h1>
          <form onSubmit={submitForm}>
            <div className={styles.input}>
              <label>Email</label>
              <TextField
                className="whiteInput emailInput"
                type="email"
                variant="outlined"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="">Password</label>
              <TextField
                className="whiteInput password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.length > 0 && (
              <div>
                <ul>
                  {errors.map((e, i) => (
                    <li key={i}>{e.message}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.loginRegisterButton}>
              <Button
                isLoading={isLoggingIn}
                text="Login"
                disabled={registerButtonDisabled}
              />
            </div>
          </form>
          <p className="center">Dont´t have an account? </p>
          <div className={styles.registerLoginButton}>
            <Link href="/register">
              <Button text="Register" secondary />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
