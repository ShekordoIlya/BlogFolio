import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (registraionData, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/",
        {
          method: "POST",
          body: JSON.stringify(registraionData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(await responce.text());
      //   if((await responce.text()).includes('user with this Email already exists.')){

      //   }
      if (!responce.ok) {
        throw new Error("error is here");
      }
      const data = await responce.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const activateUser = createAsyncThunk(
  "user/signUpUser",
  async (tokenData, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/activation/",
        {
          method: "POST",
          body: JSON.stringify(tokenData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("activated");
      //   if((await responce.text()).includes('user with this Email already exists.')){

      //   }
      if (!responce.ok) {
        throw new Error("error is here");
      }
      const data = await responce.json();
      console.log(data);
      return true;
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null as null | string,
    loading: false,
    activated: false,
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload as string;
    });
  },
});

export default UserSlice.reducer;
