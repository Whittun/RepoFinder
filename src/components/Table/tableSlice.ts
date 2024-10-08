import { createSlice } from "@reduxjs/toolkit";
import { LanguageNode } from "src/api/apiSlice";
import { RootState } from "src/store";

export interface formattedRepository {
  name: string;
  description: string;
  primaryLanguageName: string;
  languages: {
    edges: LanguageNode[];
  };
  forkCount: number;
  stargazerCount: number;
  updatedAt: string;
}

interface TableState {
  repository: formattedRepository | null;
}

const initialState: TableState = {
  repository: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRepository(state, action) {
      state.repository = action.payload;
    },
  },
});

export const { setRepository } = tableSlice.actions;
export default tableSlice.reducer;
export const selectSetRepository = (state: RootState) => state.table.repository;
