"use client";
import React, { useEffect, useState } from "react";
import { TextField, Card } from "@mui/material";
import Button from "../_components/Button/Button";
import { AUTH_URL } from "../_lib/constants";
import { validateEmail, validateName } from "../_lib/utils";
import Link from "next/link";
import styles from "../_styles/loginRegister.module.scss";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errors, setErrors] = useState([]);

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
    setIsSigningUp(true);

    const data = {
      name,
      email,
      password,
    };
    fetch(`${AUTH_URL}/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.errors && result.errors.length > 0) {
          setErrors(result.errors);
          setIsSigningUp(false);
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        setErrors([{ message: "Something went wrong. Please try again." }]);
        setIsSigningUp(false);
      });
  };
  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <h1 className="center">Register</h1>
          <form onSubmit={submitForm}>
            <div className={styles.input}>
              <label htmlFor="name">Name</label>
              <TextField
                className="whiteInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                variant="outlined"
              />
            </div>

            <div className={styles.input}>
              <label htmlFor="">Email</label>

              <TextField
                className="whiteInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="outlined"
                helperText="Must be a valid @stud.noroff.no"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="">Password</label>
              <TextField
                className="whiteInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                helperText="Minimum 8 characters"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="">Confirm Password</label>
              <TextField
                className="whiteInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
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
                isLoading={isSigningUp}
                disabled={signupButtonDisabled}
                text="Sign up"
                type="submit"
              />
            </div>
          </form>
          <p className="center">Alredy have an account?</p>
          <div className={styles.registerLoginButton}>
            <Link href="/login">
              <Button text="Login" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
