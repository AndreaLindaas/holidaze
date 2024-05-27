"use client";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Drawer, Button, Avatar } from "@mui/material"; //Riktig
import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import styles from "./Header.module.scss";
import { useStore } from "../../_lib/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };
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
        {!isDesktop && (
          <>
            {isVenueManager && (
              <li onClick={closeMenu}>
                <Link href="/venue/create">
                  <span>List your home</span>
                </Link>
              </li>
            )}
          </>
        )}
        {!accessToken && (
          <>
            <li onClick={closeMenu}>
              <Link href="/register">
                <span>Register</span>
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/login">
                <span>Login</span>
              </Link>
            </li>
          </>
        )}

        <li onClick={closeMenu}>
          <Link href="/contact">
            <span> Contact</span>
          </Link>
        </li>
        <li onClick={closeMenu}>
          <Link href="/faq">
            <span> Help center</span>
          </Link>
        </li>
        {accessToken && (
          <>
            <li onClick={closeMenu}>
              <Link href="/trips">
                <span> My trips</span>
              </Link>
            </li>
            {!isDesktop && (
              <li onClick={closeMenu}>
                <Link href="/profile">
                  <span>Profile</span>
                </Link>
              </li>
            )}
            {!isDesktop && (
              <li onClick={closeMenu}>
                <Link href="/logout">
                  <span>Logout</span>
                </Link>
              </li>
            )}
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
                  backgroundColor: "var(--peach)",
                },
              }}
            >
              {renderMenuList()}
            </Drawer>
          </div>
        ) : (
          <>
            <div>{renderMenuList()} </div>
            {accessToken && (
              <div onClick={handleClick} className={styles.iconAvatar}>
                <ArrowDropDownIcon />

                <Avatar src={avatar} alt="profile Image" />
              </div>
            )}
          </>
        )}
      </div>
      {/* {isDesktop && <div>{renderMenuList()} </div>} */}
      <Menu
        className={styles.dropDownMenu}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link href="/venue/create">
            <span>List your home</span>
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link href="/logout">
            <span>Logout</span>
          </Link>
        </MenuItem>
      </Menu>
    </nav>
  );
}
