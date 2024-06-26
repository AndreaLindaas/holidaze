"use client";
import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import styles from "./Search.module.scss";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

export default function Search(props) {
  const [searchWord, setSearchWord] = useState(
    props.searchWord ? props.searchWord : ""
  );
  const router = useRouter();

  const placeHolders = [
    "House by the sea..",
    "Dreamy cabin in the forrest..",
    "Fishing in the lake..",
    "Skiing downhill..",
    "Mountain view and fresh air..",
    "Midtown madness and great restaurants..",
    "Something boring in Oslo..",
  ];

  const randomPlaceholder = () => {
    return placeHolders[
      Math.floor(Math.random(0, placeHolders.length - 1) * placeHolders.length)
    ];
  };

  const submitSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${searchWord}`);
  };
  return (
    <div className={styles.centerSearch}>
      <form onSubmit={submitSearch}>
        <div className={styles.searchForm}>
          <TextField
            className="whiteInput"
            variant="outlined"
            value={searchWord}
            placeholder={randomPlaceholder()}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <Button text="Search" narrow />
        </div>
      </form>
    </div>
  );
}
