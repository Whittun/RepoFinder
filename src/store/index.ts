import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "src/components/Table/tableSlice";
import errorReducer from "src/pages/ErrorPage/errorPageSlice";
import { githubGraphQLApi } from "src/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    table: tableReducer,
    error: errorReducer,
    [githubGraphQLApi.reducerPath]: githubGraphQLApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubGraphQLApi.middleware),
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
