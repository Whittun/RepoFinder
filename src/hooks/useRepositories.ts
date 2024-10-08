import { useEffect, useState } from "react";
import { formattedRepository } from "../components/Table/tableSlice";
import { useLazyGetRepositoriesQuery } from "../api/apiSlice";
import { useAppDispatch } from "../store";
import { setError } from "../pages/ErrorPage/errorPageSlice";
import { useNavigate } from "react-router-dom";

export const useRepositories = (
  searchQuery: string | null,
  rowsPerPage: number,
  orderBy: keyof formattedRepository,
  order: "asc" | "desc",
) => {
  const [beforeCursor, setBeforeCursor] = useState<null | string>(null);
  const [afterCursor, setAfterCursor] = useState<null | string>(null);
  const [repositories, setRepositories] = useState<
    null | formattedRepository[]
  >(null);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const [trigger, { data, isLoading, isSuccess, isFetching }] =
    useLazyGetRepositoriesQuery();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      trigger({
        query: searchQuery,
        numberElements: rowsPerPage,
        before: beforeCursor,
        after: afterCursor,
      });
    }

    setIsDataLoading(true);
  }, [trigger, searchQuery, rowsPerPage, beforeCursor, afterCursor]);

  useEffect(() => {
    if (data) {
      if ("errors" in data) {
        dispatch(setError(data.errors[0].message));
        navigate("/error-page");
      } else {
        const formattedData = data.data.search.edges.map(({ node }) => {
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

        const sortedRepositories = formattedData.sort((a, b) => {
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

        setRepositories(sortedRepositories);
        setIsDataLoading(false);
      }
    }
  }, [data, orderBy, order, dispatch, navigate]);

  return {
    data,
    repositories,
    isLoading,
    isFetching,
    isSuccess,
    isDataLoading,
    setAfterCursor,
    setBeforeCursor,
  };
};
