import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Repositories {
  data: {
    search: {
      edges: Repository[];
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
      };
    };
  };
}

export interface Repository {
  cursor: string;
  node: {
    description: string;
    forkCount: number;
    languages: { edges: LanguageNode[] };
    name: string;
    primaryLanguage: { name: string };
    stargazerCount: number;
    updatedAt: string;
  };
}

export interface LanguageNode {
  node: {
    name: string;
  };
}

interface SearchArgs {
  query: string;
  numberElements: number;
  before: string | null;
  after: string | null;
}

interface Errors {
  errors: Error[];
}

interface Error {
  locations: ErrorLocation[];
  message: string;
}

interface ErrorLocation {
  column: number;
  line: number;
}

export const githubGraphQLApi = createApi({
  reducerPath: "githubGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/graphql",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${import.meta.env.VITE_API_KEY}`);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRepositories: builder.query<Repositories | Errors, SearchArgs>({
      query: ({ query, numberElements, before, after }) => {
        const gqlQuery = `
            query() {
              search(query: "${query}", type: REPOSITORY, ${before ? "last:" + numberElements + ", before:" + `"${before}"` : after ? "first:" + numberElements + ", after: " + `"${after}"` : "first:" + numberElements}) {
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
                  cursor
                }
                pageInfo {
                  startCursor
                  endCursor
                  hasPreviousPage
                  hasNextPage
                }
              }
            }`;

        return {
          url: "",
          method: "POST",
          body: {
            query: gqlQuery,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetRepositoriesQuery } = githubGraphQLApi;
