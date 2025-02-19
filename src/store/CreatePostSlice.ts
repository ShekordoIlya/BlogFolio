import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const access = localStorage.getItem("access");
      const response = await fetch(
        "https://studapi.teachmeskills.by/blog/posts/",
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(access as string),
          },
          body: formData as any,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          return rejectWithValue(errorData.detail);
        }
        throw new Error("error is here");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
const CreatePostSlice = createSlice({
  name: "addPosts",
  initialState: {
    post: null,
    isLoading: false,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      (state.post = action.payload), (state.isLoading = false);
    });
    builder.addCase(createPost.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      (state.error = (action.payload as string) || "error!!!!!!"),
        (state.isLoading = false);
    });
  },
});
export default CreatePostSlice.reducer;
