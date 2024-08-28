import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue: "",
    isDataLoading: false,
  },
  reducers: {
    searchInputHandler(state, action) {
      state.searchValue = action.payload;
    },
    setLoading(state, action) {
      state.isDataLoading = action.payload;
    },
  },
});

export const { searchInputHandler, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
