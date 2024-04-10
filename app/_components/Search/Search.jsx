import React from "react";
import { TextField } from "@mui/material";
import styles from "./Search.module.scss";
export default function Search() {
  return (
    <div className={styles.centerSearch}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  );
}
