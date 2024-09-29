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
  endpoints: (builder) => ({
    getRepositories: builder.query({
      query: (query: string) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query() {
              search(query: "${query}", type: REPOSITORY, first: 50) {
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
        },
      }),
    }),
  }),
});
