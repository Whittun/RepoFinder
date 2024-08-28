import { RepositoryData, SearchComponent } from "./components/Search/Search";
import { GlobalCssPriority } from "./GlobalCssPriority";
import { MainContent } from "./components/MainContent/MainContent";
import { useState } from "react";
import { DetailInfo } from "./components/DetailInfo/DetailInfo";
import { Box, Typography } from "@mui/material";

import styles from "./App.module.scss";

interface LanguageNode {
  node: {
    name: string;
  };
}

// interface NodeData {
//   name: string;
//   description: string;
//   primaryLanguage: {
//     name: string;
//   };
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

interface RepositoryData {
  name: string;
  description: string;
  primaryLanguage: string;
  languages: LanguageNode[];
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

// const query = `query {
//   search(query: "test", type: REPOSITORY, first: 10) {
//     edges {
//       node {
//         ... on Repository {
//           name
//           description
//           primaryLanguage {
//             name
//           }
//           languages(first:10) {
//             edges {
//               node {
//                 name
//               }
//             }
//           }
//           forkCount
//           stargazerCount
//           updatedAt
//         }
//       }
//     }
//   }
// }`;

// const getGithubData = async () => {
//   const response = await fetch("https://api.github.com/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `bearer ${process.env.REACT_APP_API_KEY}`,
//     },
//     body: JSON.stringify({ query }),
//   });

//   const data = await response.json();

//   const formattedData = data.data.search.edges.map(({ node }: Edge) => {
//     const {
//       name,
//       description,
//       primaryLanguage: { name: primaryLanguage },
//       languages,
//       forkCount,
//       stargazerCount,
//       updatedAt,
//     } = node;

//     return {
//       name,
//       description,
//       primaryLanguage,
//       languages,
//       forkCount,
//       stargazerCount,
//       updatedAt,
//     };
//   });
//   console.log(formattedData);
//   return formattedData;
// };

export const App = () => {
  const [githubData, setGithubData] = useState<RepositoryData[] | null>(null);
  const [selectedRepository, setSelectedRepository] =
    useState<RepositoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalCssPriority>
      <Box></Box>
      <Box className={styles.app}>
        <SearchComponent
          setIsLoading={setIsLoading}
          setGithubData={setGithubData}
        />
        {githubData ? (
          <Box className={styles["content-wrapper"]}>
            <MainContent
              setSelectedRepository={setSelectedRepository}
              githubData={githubData}
              isLoading={isLoading}
            />
            <DetailInfo selectedRepository={selectedRepository} />
          </Box>
        ) : (
          <Box>
            {isLoading ? (
              <Typography
                className={styles.welcome}
                component="h1"
                variant="h3"
              >
                Ищем репозитории
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
              </Typography>
            ) : (
              <Typography
                className={styles.welcome}
                component="h1"
                variant="h3"
              >
                Добро пожаловать
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </GlobalCssPriority>
  );
};
