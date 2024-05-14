"use client";
import Button from "./_components/Button/Button";
import Search from "./_components/Search/Search";
import Venues from "./_components/Venues/Venues";
import styles from "./page.module.scss";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
export default function Home() {
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <main>
      <div className={styles.backgroundImage}></div>
      {isDesktop && (
        <>
          <div className={styles.slogan}>
            Unlock your next adventure -
            <span className="orange">book now!</span>
          </div>
          <div className={styles.searchContainer}>
            <Search />
          </div>
        </>
      )}
      {!isDesktop && (
        <div className={styles.positionButton}>
          <Link href="/search">
            <Button text="Find a stay" icon={<SearchIcon />} />
          </Link>
        </div>
      )}
      <Venues limit={10} />
    </main>
  );
}
