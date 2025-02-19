import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    selectedPost: null,
  },
  reducers: {
    selectPost(state, action) {
      state.selectedPost = action.payload;
    },
    clearPost(state) {
      state.selectedPost = null;
    },
    fetchPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  selectPost,
  clearPost,
  fetchPostFail,
  fetchPostStart,
  fetchPostSuccess,
} = postSlice.actions;
export const fetchPostsAction = () => {
  return { type: "posts/fetchPosts" };
};

export default postSlice.reducer;
