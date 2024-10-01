import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../components/Table/tableSlice";
import searchReducer from "./searchSlice";
import { githubGraphQLApi } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    search: searchReducer,
    [githubGraphQLApi.reducerPath]: githubGraphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubGraphQLApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
