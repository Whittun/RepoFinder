import { Box } from "@mui/material";
import { SearchComponent } from "../../components/Search/Search";
import { MainContent } from "../../components/MainContent/MainContent";
import { DetailInfo } from "../../components/DetailInfo/DetailInfo";

import styles from "../../App.module.scss";

export const MainPage = () => {
  return (
    <Box className={styles.app}>
      <SearchComponent />
      <Box className={styles["content-wrapper"]}>
        <MainContent />
        <DetailInfo />
      </Box>
    </Box>
  );
};
