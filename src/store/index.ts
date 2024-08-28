import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";
import searchReducer from "./searchSlice";
import { githubGraphQLApi } from "../api/apiSlice";

export default configureStore({
  reducer: {
    table: tableReducer,
    search: searchReducer,
    [githubGraphQLApi.reducerPath]: githubGraphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubGraphQLApi.middleware),
});
