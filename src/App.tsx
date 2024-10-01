import { SearchComponent } from "./components/Search/Search";
import { GlobalCssPriority } from "./GlobalCssPriority";
import { MainContent } from "./components/MainContent/MainContent";
import { DetailInfo } from "./components/DetailInfo/DetailInfo";
import { Box } from "@mui/material";

import styles from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <GlobalCssPriority>
      <BrowserRouter>
        <Box className={styles.app}>
          <SearchComponent />
          <Box className={styles["content-wrapper"]}>
            <MainContent />
            <DetailInfo />
          </Box>
        </Box>
      </BrowserRouter>
    </GlobalCssPriority>
  );
};

{
  /* <Typography className={styles.welcome} component="h1" variant="h3">
  Ищем репозитории
  <span className={styles.dot}>.</span>
  <span className={styles.dot}>.</span>
  <span className={styles.dot}>.</span>
</Typography>; */
}
