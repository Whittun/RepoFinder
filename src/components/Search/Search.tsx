import styles from "./Search.module.scss";
import { AppBar, Button, Stack, TextField } from "@mui/material";

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
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setGithubData: React.Dispatch<React.SetStateAction<RepositoryData[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  searchValue,
  setSearchValue,
  setGithubData,
  setIsLoading,
}) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const query = `query {
    search(query: "${searchValue}", type: REPOSITORY, first: 50) {
      edges {
        node {
          ... on Repository {
            name
            description
            primaryLanguage {
              name
            }
            languages(first:10) {
              edges {
                node {
                  name
                }
              }
            }
            forkCount
            stargazerCount
            updatedAt
          }
        }
      }
    }
  }`;

  const getGithubData = async () => {
    setIsLoading(true);
    console.log(query);
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

  const setFetchData = async () => {
    const githubData = await getGithubData();

    setGithubData(githubData);
    setIsLoading(false);
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Stack direction="row" spacing={1}>
        <TextField
          className={styles["search-wrapper"]}
          InputProps={{
            className: styles["search-inner"],
          }}
          inputProps={{
            onChange: inputHandler,
            value: searchValue,
            className: styles["search-input"],
          }}
          placeholder="Поисковый запрос"
        ></TextField>
        <Button
          onClick={setFetchData}
          className={styles[`search-button`]}
          variant="contained"
        >
          Искать
        </Button>
      </Stack>
    </AppBar>
  );
};
