import styles from "./Search.module.scss";
import { AppBar, Button, Stack, TextField } from "@mui/material";

// interface LanguageNode {
//   node: {
//     name: string;
//   };
// }

// interface NodeData {
//   name: string;
//   description: string;
//   primaryLanguage: {
//     name: string;
//   } | null;
//   languages: {
//     edges: LanguageNode[];
//   };
//   forkCount: number;
//   stargazerCount: number;
//   updatedAt: string;
// }

// interface Edge {
//   node: NodeData;
// }

// export interface RepositoryData {
//   name: string;
//   description: string;
//   primaryLanguageName: string;
//   languages: { edges: LanguageNode[] };
//   forkCount: number;
//   stargazerCount: number;
//   updatedAt: string;
// }

export const SearchComponent = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  //   const formattedData = data.data.search.edges.map(({ node }: Edge) => {
  //     const {
  //       name,
  //       description,
  //       primaryLanguage,
  //       languages,
  //       forkCount,
  //       stargazerCount,
  //       updatedAt,
  //     } = node;

  //     const primaryLanguageName = primaryLanguage?.name ?? "Unknown";

  //     return {
  //       name,
  //       description,
  //       primaryLanguageName,
  //       languages,
  //       forkCount,
  //       stargazerCount,
  //       updatedAt,
  //     };
  //   });

  //   return formattedData;
  // };

  return (
    <AppBar position="static" className={styles.header}>
      <Stack direction="row" spacing={1}>
        <TextField
          className={styles["search-wrapper"]}
          InputProps={{
            className: styles["search-inner"],
          }}
          inputProps={{
            className: styles["search-input"],
          }}
          placeholder="Поисковый запрос"
        ></TextField>
        <Button className={styles[`search-button`]} variant="contained">
          Искать
        </Button>
      </Stack>
    </AppBar>
  );
};
