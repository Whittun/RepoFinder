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
  Typography,
} from "@mui/material";

import styles from "./Table.module.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formattedRepository, setRepository } from "./tableSlice";
import { useAppDispatch } from "src/store";
import { useRepositories } from "src/hooks/useRepositories";

export const TableComponent = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof formattedRepository>("forkCount");
  const [message, setMessage] = useState<string>("Добро пожаловать");

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  const {
    data,
    repositories,
    isLoading,
    isFetching,
    isSuccess,
    isDataLoading,
    setAfterCursor,
    setBeforeCursor,
  } = useRepositories(searchQuery, rowsPerPage, orderBy, order);

  useEffect(() => {
    if (isLoading || isFetching) {
      setMessage("Загрузка...");
    }
    if (data && "data" in data) {
      if (isSuccess && data.data.search.edges.length && !isFetching) {
        setMessage("Результаты поиска");
      }
      if (isSuccess && data.data.search.edges.length === 0 && !isFetching) {
        setMessage("Ничего не найдено");
      }
    }
  }, [isLoading, isSuccess, isFetching, data]);

  const rowHandler = (tableData: formattedRepository) => {
    dispatch(setRepository(tableData));
  };

  const handleRowOrder = (row: keyof formattedRepository) => {
    const isAsc = row === orderBy && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(row);
  };

  const changePageHandler = (newPage: number) => {
    if (data && "data" in data) {
      if (newPage > page && data.data.search.pageInfo.hasNextPage) {
        setAfterCursor(data.data.search.pageInfo.endCursor);
        setBeforeCursor(null);
      } else if (newPage < page && data.data.search.pageInfo.hasPreviousPage) {
        setBeforeCursor(data.data.search.pageInfo.startCursor);
        setAfterCursor(null);
      }

      setPage(newPage);
    }
  };

  const changeRowsPerPageHandler = (rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  return (
    <Box
      className={`${styles["table-wrapper"]} ${isSuccess ? styles["table-wrapper--not-empty"] : ""}`}
    >
      {message && (
        <Box
          className={styles[`welcome-wrapper${isSuccess ? "--loaded" : ""}`]}
        >
          <Typography className={styles.welcome} component="h1" variant="h3">
            {message}
          </Typography>
        </Box>
      )}
      {repositories && data && "data" in data && (
        <Box className={styles["table-inner"]}>
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
                {isDataLoading
                  ? [...Array(rowsPerPage)].map((_, index) => {
                      return (
                        <TableRow key={index}>
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
                      );
                    })
                  : repositories.map((row, index) => {
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
          <TablePagination
            className={styles.pagination}
            component={"div"}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => changePageHandler(newPage)}
            onRowsPerPageChange={(e) =>
              changeRowsPerPageHandler(Number(e.target.value))
            }
            count={-1}
            slotProps={{
              actions: {
                nextButton: {
                  disabled:
                    !data.data?.search.pageInfo.hasNextPage || isFetching,
                },
                previousButton: {
                  disabled:
                    isFetching || !data.data?.search?.pageInfo?.hasPreviousPage,
                },
              },
            }}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} из ${count !== -1 ? count : `больше чем ${to}`}`
            }
          />
        </Box>
      )}
    </Box>
  );
};
