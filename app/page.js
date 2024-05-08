"use client";
import Button from "./_components/Button/Button";
import Search from "./_components/Search/Search";
import Venues from "./_components/Venues/Venues";
import styles from "./page.module.scss";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function Home() {
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <main>
      <div className={styles.backgroundImage}></div>
      {isDesktop && (
        <>
          <div className={styles.slogan}>
            Unlock your next adventure - book now!
          </div>
          <div className={styles.searchContainer}>
            <Search />
          </div>
        </>
      )}
      {!isDesktop && (
        <div className={styles.positionButton}>
          <Button text="Find a stay" icon={<SearchIcon />} />{" "}
        </div>
      )}
      <Venues />
    </main>
  );
}
