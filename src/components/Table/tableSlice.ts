import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    repository: null,
  },
  reducers: {
    setRepository(state, action) {
      state.repository = action.payload;
    },
  },
});

export const { setRepository } = tableSlice.actions;
export default tableSlice.reducer;
export const selectSetRepository = (state: RootState) => state.table.repository;
