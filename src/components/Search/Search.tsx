import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";
import { AppBar, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export const SearchComponent = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [, setSearchParams] = useSearchParams();

  const updateQuery = () => {
    setSearchParams({ query: inputValue, page: "1" });
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Stack direction="row" spacing={1}>
        <TextField
          className={styles["search-wrapper"]}
          InputProps={{
            className: styles["search-inner"],
          }}
          inputProps={{
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value),
            value: inputValue,
            className: styles["search-input"],
          }}
          placeholder="Поисковый запрос"
        ></TextField>
        <Button
          onClick={updateQuery}
          className={styles[`search-button`]}
          variant="contained"
        >
          Искать
        </Button>
      </Stack>
    </AppBar>
  );
};
