import { Box, Typography } from "@mui/material";

import styles from "./MainContent.module.scss";
import { TableComponent } from "../Table/Table";

export const MainContent = () => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.table}>
        <Typography variant="h3" component="h1">
          Результаты поиска
        </Typography>
        <TableComponent />
      </Box>
    </Box>
  );
};
