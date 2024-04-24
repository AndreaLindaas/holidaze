"use client";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Button, Avatar } from "@mui/material"; //Riktig
import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import styles from "./Header.module.scss";
import { useStore } from "../../_lib/store";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isVenueManager, avatar } = useStore();
  const isDesktop = useMediaQuery("(min-width:768px)");

  const toggleDrawer = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const renderMenuList = () => {
    return (
      <ul className={styles.menuList}>
        {isVenueManager && <li>test</li>}
        <li>
          <Link href="/login" className="login-link">
            <span> Login</span>
          </Link>
        </li>

        <li>
          <Link href="/register">
            <span> Register</span>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <span> Profile</span>
          </Link>
        </li>
        <>
          <li>
            <Link href="#">
              <span> Logout</span>
            </Link>
          </li>
        </>
      </ul>
    );
  };
  return (
    <nav className={styles.header}>
      <div className={styles.logoAvatar}>
        <Link href="/">
          <img src="/logo-color.png" className={styles.logo} alt="" />
          <span>Holidaze</span>
        </Link>
        {!isDesktop ? (
          <div>
            <MenuIcon onClick={toggleDrawer} />
            <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
              {renderMenuList()}
            </Drawer>
          </div>
        ) : (
          <Avatar alt="Remy Sharp" src={avatar} />
        )}
      </div>
      {isDesktop && <div>{renderMenuList()} </div>}
    </nav>
  );
}
