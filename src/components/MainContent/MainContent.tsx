import { Box, Typography } from "@mui/material";

import styles from "./MainContent.module.scss";
import { TableComponent } from "../Table/Table";
import { RepositoryData } from "../Search/Search";

interface MainContentProps {
  githubData: RepositoryData[];
  setSelectedRepository: React.Dispatch<
    React.SetStateAction<RepositoryData | null>
  >;
}

export const MainContent: React.FC<MainContentProps> = ({
  githubData,
  setSelectedRepository,
}) => {
  return (
    <Box component="main" className={styles.main}>
      <Box className={styles.table}>
        <Typography variant="h3" component="h1">
          Результаты поиска
        </Typography>
        <TableComponent
          setSelectedRepository={setSelectedRepository}
          tableData={githubData}
        />
      </Box>
    </Box>
  );
};
