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

  const submitSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${searchWord}`);
  };
  return (
    <div className={styles.centerSearch}>
      <form onSubmit={submitSearch}>
        <TextField
          id="outlined-basic"
          label="Enter search"
          variant="outlined"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Button text="Search" />
      </form>
    </div>
  );
}
