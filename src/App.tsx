import { useEffect, useState } from "react";

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
  };
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

interface RepositoryData {
  name: string;
  description: string;
  primaryLanguage: string;
  languages: LanguageNode[];
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

const query = `query {
  search(query: "test", type: REPOSITORY, first: 10) {
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
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  const formattedData = data.data.search.edges.map(({ node }: Edge) => {
    const {
      name,
      description,
      primaryLanguage: { name: primaryLanguage },
      languages,
      forkCount,
      stargazerCount,
      updatedAt,
    } = node;

    return {
      name,
      description,
      primaryLanguage,
      languages,
      forkCount,
      stargazerCount,
      updatedAt,
    };
  });
  console.log(formattedData);
  return formattedData;
};

export const App = () => {
  const [githubData, setGithubData] = useState<RepositoryData[] | null>(null);

  const setFetchData = async () => {
    const githubData = await getGithubData();

    setGithubData(githubData);
  };

  useEffect(() => {
    setFetchData();
  }, []);

  return <div>{githubData && githubData.map((elem) => elem.name)}</div>;
};
