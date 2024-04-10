"use client";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Button } from "@mui/material"; //Riktig
import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import styles from "./Header.module.scss";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <li>
          <Link href="#" className="login-link">
            <span> Login</span>
          </Link>
        </li>

        <li>
          <Link href="/">
            <span> Home</span>
          </Link>
        </li>

        <>
          {!isDesktop && (
            <li>
              <Link href="#">
                <span> Contact us</span>
              </Link>
            </li>
          )}
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
      <Link href="/">
        <span>Holidaze</span>
      </Link>
      {isDesktop && (
        <>
          <div className={styles.menuListButton}>
            {renderMenuList()}{" "}
            <Button variant="contained" className="primary">
              Contact us
            </Button>
          </div>
        </>
      )}
      {!isDesktop && (
        <div>
          <MenuIcon onClick={toggleDrawer} />
          <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
            {renderMenuList()}
          </Drawer>
        </div>
      )}
    </nav>
  );
}
