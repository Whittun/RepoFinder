import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    page: 0,
    rowsPerPage: 10,
    order: "asc",
    orderBy: "forkCount",
    repositories: [],
  },
  reducers: {
    handleRowOrder(state, action) {
      const isAsc = action.payload === state.orderBy && state.order === "asc";

      state.order = isAsc ? "desc" : "asc";
      state.orderBy = action.payload;
    },
    changePageHandler(state, action) {
      state.page = action.payload;
    },
    changeRowsPerPageHandler(state, action) {
      const rowsPerPage = Number(action.payload);

      state.rowsPerPage = rowsPerPage;
      state.page = 0;
    },
    setRepositories(state, action) {
      state.repositories = action.payload;
    },
  },
});

export const {
  handleRowOrder,
  changePageHandler,
  changeRowsPerPageHandler,
  setRepositories,
} = tableSlice.actions;
export default tableSlice.reducer;

// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(10);
// const [order, setOrder] = useState<"asc" | "desc">("asc");
// const [orderBy, setOrderBy] = useState<keyof RepositoryData>("forkCount");
