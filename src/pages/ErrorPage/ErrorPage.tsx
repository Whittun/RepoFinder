import { Alert, AlertTitle, Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import { RootState } from "../../store";

export const ErrorPage = () => {
  const error = useSelector((state: RootState) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      navigate("/");
    }
  }, [error, navigate]);

  return (
    <Box className={styles.wrapper}>
      <Alert className={styles.error} severity="error">
        <AlertTitle className={styles["error-text"]}>{error}</AlertTitle>
      </Alert>
    </Box>
  );
};
