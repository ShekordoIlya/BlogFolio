import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (objectFromPostsPage, { rejectWithValue }) => {
    const { limit, offset, searchQuery, ordering } = objectFromPostsPage;
    try {
      const response = await fetch(
        `https://studapi.teachmeskills.by/blog/posts/?limit=${limit}&offset=${offset}&ordering=${ordering}&search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "error");
    }
  }
);
const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    posts: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
    ordering: "",
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setOrdering: (state, action) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.results;
        state.totalItems = action.payload.count;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload as string);
      });
  },
});
export const { setPage, setSearchQuery, setOrdering } = paginationSlice.actions;

export default paginationSlice.reducer;
