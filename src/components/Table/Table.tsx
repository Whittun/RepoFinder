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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyGetRepositoriesQuery } from "../../api/apiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRepository } from "./tableSlice";
import { setError } from "../../pages/ErrorPage/errorPageSlice";

interface LanguageNode {
  node: {
    name: string;
  };
}

export interface RepositoryData {
  name: string;
  description: string;
  primaryLanguageName: string;
  languages: { edges: LanguageNode[] };
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

interface NodeData {
  name: string;
  description: string;
  primaryLanguage: {
    name: string;
  } | null;
  languages: {
    edges: LanguageNode[];
  };
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

interface Edge {
  node: NodeData;
}

export const TableComponent = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof RepositoryData>("forkCount");
  const [message, setMessage] = useState("Добро пожаловать");
  const [beforeCursor, setBeforeCursor] = useState(null);
  const [afterCursor, setAfterCursor] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  const [trigger, { data, isLoading, isSuccess, isFetching }] =
    useLazyGetRepositoriesQuery();

  useEffect(() => {
    if (searchQuery) {
      trigger({
        query: searchQuery,
        numberElements: rowsPerPage,
        before: beforeCursor,
        after: afterCursor,
      });
    }
  }, [trigger, searchQuery, rowsPerPage, beforeCursor, afterCursor]);

  useEffect(() => {
    if (data?.errors) {
      dispatch(setError(data.errors[0].message));
      navigate("/error-page");
    }
  }, [data, dispatch, navigate]);

  useEffect(() => {
    if (isLoading || isFetching) {
      console.log("Загрузка...");
      setMessage("Загрузка...");
    }

    if (isSuccess && data.data.search.edges.length && !isFetching) {
      console.log("Результаты поиска");
      setMessage("Результаты поиска");
    }

    if (isSuccess && data.data.search.edges.length === 0 && !isFetching) {
      setMessage("Ничего не найдено");
    }
  }, [isLoading, isSuccess, isFetching, data]);

  let formattedData = null;

  if (data && !data.errors) {
    formattedData = data.data.search.edges.map(({ node }: Edge) => {
      const {
        name,
        description,
        primaryLanguage,
        languages,
        forkCount,
        stargazerCount,
        updatedAt,
      } = node;

      const primaryLanguageName = primaryLanguage?.name ?? "Unknown";

      return {
        name,
        description,
        primaryLanguageName,
        languages,
        forkCount,
        stargazerCount,
        updatedAt,
      };
    });
  }

  let sortedRows = null;

  if (formattedData) {
    sortedRows = formattedData.sort((a, b) => {
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
  }

  const rowHandler = (tableData: RepositoryData) => {
    dispatch(setRepository(tableData));
  };

  const handleRowOrder = (row: keyof RepositoryData) => {
    const isAsc = row === orderBy && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(row);
  };

  const changePageHandler = (newPage: number) => {
    if (newPage > page && data.data.search.pageInfo.hasNextPage) {
      setAfterCursor(data.data.search.pageInfo.endCursor);
      setBeforeCursor(null);
    } else if (newPage < page && data.data.search.pageInfo.hasPreviousPage) {
      setBeforeCursor(data.data.search.pageInfo.startCursor);
      setAfterCursor(null);
    }

    setPage(newPage);
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
      {isSuccess && !!sortedRows?.length && (
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
                {isFetching
                  ? sortedRows.map(() => (
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
                    ))
                  : sortedRows &&
                    sortedRows.map((row, index) => {
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
              changeRowsPerPageHandler(e.target.value)
            }
            count={-1}
            slotProps={{
              actions: {
                nextButton: {
                  disabled:
                    !data.data.search.pageInfo.hasNextPage || isFetching,
                },
                previousButton: {
                  disabled:
                    isFetching ||
                    !data?.data?.search?.pageInfo?.hasPreviousPage,
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
