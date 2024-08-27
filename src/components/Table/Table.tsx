import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import styles from "./Table.module.scss";
import { RepositoryData } from "../Search/Search";
import { useState } from "react";

interface TableComponentProps {
  tableData: RepositoryData[];
  setSelectedRepository: React.Dispatch<
    React.SetStateAction<RepositoryData | null>
  >;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  tableData,
  setSelectedRepository,
  isLoading,
}) => {
  const rowHandler = (tableData: RepositoryData) => {
    setSelectedRepository(tableData);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof RepositoryData>("forkCount");

  const changePageHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const changeRowsPerPageHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const rowsPerPage = Number(event.target.value);
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  const handleRowOrder = (property: keyof RepositoryData) => {
    const isAsc = property === orderBy && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = tableData.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }

    return 0;
  });

  return (
    <Box className={styles["table-wrapper"]}>
      <TableContainer className={styles.table}>
        <Table aria-label="таблица с результатами">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "forkCount"}
                  onClick={() => handleRowOrder("forkCount")}
                  className={styles.sort}
                  direction={orderBy === "forkCount" ? order : "asc"}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stargazerCount"}
                  onClick={() => handleRowOrder("stargazerCount")}
                  className={styles.sort}
                  direction={orderBy === "stargazerCount" ? order : "asc"}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "updatedAt"}
                  onClick={() => handleRowOrder("updatedAt")}
                  className={styles.sort}
                  direction={orderBy === "updatedAt" ? order : "asc"}
                >
                  Дата обновления
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                })
            ) : (
              <TableRow>
                <TableCell>
                  <Box className={styles["load-cell"]}></Box>
                </TableCell>
                <TableCell>
                  <Box className={styles["load-cell"]}></Box>
                </TableCell>
                <TableCell>
                  <Box className={styles["load-cell"]}></Box>
                </TableCell>
                <TableCell>
                  <Box className={styles["load-cell"]}></Box>
                </TableCell>
                <TableCell>
                  <Box className={styles["load-cell"]}></Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!isLoading && (
        <TablePagination
          className={styles.pagination}
          component={"div"}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={changePageHandler}
          onRowsPerPageChange={changeRowsPerPageHandler}
          count={tableData.length}
        />
      )}
    </Box>
  );
};
