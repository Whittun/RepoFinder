import { Box } from "@mui/material";

import styles from "./MainContent.module.scss";
import { TableComponent } from "src/components/Table/Table";

export const MainContent = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.table}>
        <TableComponent />
      </Box>
    </Box>
  );
};
