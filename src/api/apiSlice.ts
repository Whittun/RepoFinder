import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    getRepositories: builder.query({
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
        console.log(gqlQuery);
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

// before: ${before ? `"${before}"` : "null"}, after: ${after ? `"${after}"` : "null"}
