import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubGraphQLApi = createApi({
  reducerPath: "githubGraphQLApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/graphql",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${process.env.REACT_APP_API_KEY}`);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getRepositories: build.query({
      query: (queryString) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query($queryString: String!) {
              search(query: $queryString, type: REPOSITORY, first: 50) {
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
            }`,
          variables: {
            queryString,
          },
        },
      }),
    }),
  }),
});

export const { useLazyGetRepositoriesQuery } = githubGraphQLApi;
