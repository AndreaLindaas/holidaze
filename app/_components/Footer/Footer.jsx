"use client";
import styles from "./Footer.module.scss";
import React from "react";
import { TextField } from "@mui/material";
import Button from "../Button/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
export default function Footer() {
  const submitSubscribe = (e) => {
    e.preventDefault();
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContentContainer}>
        <div>
          <h4 className="orangeHeader">Contact</h4>
          <p>Email: support@Holidaze.com</p>
          <p>Phone: +123-456-7890</p>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </a>

            <a href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div>
          <h4 className="orangeHeader">Legal</h4>
          <ul>
            <li>
              <a>Terms of Service</a>
            </li>
            <li>
              <a>Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="orangeHeader">Stay Updated</h4>
          <form onSubmit={submitSubscribe}>
            <TextField
              type="email"
              placeholder="Your email"
              className="whiteInput"
            />
            <div className={styles.subscribeButton}>
              <Button text="Subscribe" narrow />
            </div>
          </form>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Your Holidaze. All rights reserved.</p>
      </div>
    </footer>
  );
}
