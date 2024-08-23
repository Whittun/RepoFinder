import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./Table.module.scss";
import { RepositoryData } from "../Search/Search";

interface TableComponentProps {
  tableData: RepositoryData[];
  setSelectedRepository: React.Dispatch<
    React.SetStateAction<RepositoryData | null>
  >;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  tableData,
  setSelectedRepository,
}) => {
  const rowHandler = (tableData: RepositoryData) => {
    setSelectedRepository(tableData);
  };

  return (
    <TableContainer className={styles.table}>
      <Table aria-label="таблица с результатами">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Язык</TableCell>
            <TableCell>Число форков</TableCell>
            <TableCell>Число звезд</TableCell>
            <TableCell>Дата обновления</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => {
            const date = new Date(row.updatedAt);

            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();

            const formattedDate = `${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year}`;

            return (
              <TableRow
                onClick={() => rowHandler(row)}
                className={styles.row}
                key={index}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.primaryLanguageName}</TableCell>
                <TableCell>{row.forkCount}</TableCell>
                <TableCell>{row.stargazerCount}</TableCell>
                <TableCell>{formattedDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
