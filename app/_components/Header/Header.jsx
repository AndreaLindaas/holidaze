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
  const { isVenueManager, avatar, accessToken } = useStore();
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
        {isVenueManager && (
          <li>
            <Link href="/venue/create">
              <span>List your home</span>
            </Link>
          </li>
        )}
        {!accessToken && (
          <li>
            <Link href="/login" className="login-link">
              <span>Login</span>
            </Link>
          </li>
        )}

        <li>
          <Link href="/">
            <span> Contact</span>
          </Link>
        </li>
        {accessToken && (
          <>
            <li>
              <Link href="/trips">
                <span> Trips</span>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <Link href="/logout">
                <span>Logout</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  };
  return (
    <nav className={styles.header}>
      <div className={styles.logoAvatar}>
        <Link className={styles.logo} href="/">
          <img src="/logo-color.png" className={styles.logo} alt="" />
          <span>Holidaze</span>
        </Link>
        {!isDesktop ? (
          <div>
            <MenuIcon onClick={toggleDrawer} />
            <Drawer
              anchor="top"
              open={menuOpen}
              onClose={closeMenu}
              PaperProps={{
                sx: {
                  backgroundColor: "var(--green)",
                },
              }}
            >
              {renderMenuList()}
            </Drawer>
          </div>
        ) : (
          <>
            {" "}
            <div>{renderMenuList()} </div>
            <Link href="/profile">
              <Avatar alt="Remy Sharp" src={avatar} />
            </Link>
          </>
        )}
      </div>
      {/* {isDesktop && <div>{renderMenuList()} </div>} */}
    </nav>
  );
}
