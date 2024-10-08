import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { LanguageNode } from "../../api/apiSlice";

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
