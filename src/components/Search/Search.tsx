import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.scss";
import { AppBar, Button, Stack, TextField } from "@mui/material";
import { searchInputHandler } from "../../store/searchSlice";
import { useLazyGetRepositoriesQuery } from "../../api/apiSlice";
import { useEffect } from "react";

interface LanguageNode {
  node: {
    name: string;
  };
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

export interface RepositoryData {
  name: string;
  description: string;
  primaryLanguageName: string;
  languages: { edges: LanguageNode[] };
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

interface SearchComponentProps {
  setGithubData: React.Dispatch<React.SetStateAction<RepositoryData[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  setGithubData,
}) => {
  const dispatch = useDispatch();

  const { searchValue } = useSelector((state) => state.search);

  const [triggerSearch, { data, isLoading }] = useLazyGetRepositoriesQuery();

  const handleSearch = async () => {
    await triggerSearch(searchValue);
  };

  const setFetchData = async () => {
    const githubData = await getGithubData();

    setGithubData(githubData);
  };

  useEffect(() => {
    if (data) {
      setFetchData();
    }
  }, [data]);

  const getGithubData = async () => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data);

    const formattedData = data.data.search.edges.map(({ node }: Edge) => {
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

    return formattedData;
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Stack direction="row" spacing={1}>
        {isLoading && "Загрузка..."}
        <TextField
          className={styles["search-wrapper"]}
          InputProps={{
            className: styles["search-inner"],
          }}
          inputProps={{
            onChange: (e) => dispatch(searchInputHandler(e.target.value)),
            value: searchValue,
            className: styles["search-input"],
          }}
          placeholder="Поисковый запрос"
        ></TextField>
        <Button
          onClick={handleSearch}
          className={styles[`search-button`]}
          variant="contained"
        >
          Искать
        </Button>
      </Stack>
    </AppBar>
  );
};
