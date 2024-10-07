import { createSlice } from "@reduxjs/toolkit";

const errorPageSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    setError: (state, action) => action.payload,
    clearError: () => null,
  },
});

export const { setError } = errorPageSlice.actions;

export default errorPageSlice.reducer;
