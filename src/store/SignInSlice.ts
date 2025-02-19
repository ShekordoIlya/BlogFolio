import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let refreshInterval = null;
export const signInUser = createAsyncThunk(
  "signIn/signInUser",
  async (userLoginData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/create/",
        {
          method: "POST",
          body: JSON.stringify(userLoginData),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
      localStorage.setItem("access", JSON.stringify(data.access));
      localStorage.setItem("refresh", JSON.stringify(data.refresh));
      console.log(data);
      dispatch(startTokenUpdate());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        throw new Error("no refresh token");
      }
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/refresh/",
        {
          method: "POST",
          body: JSON.stringify({
            refresh: JSON.parse(refreshToken),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.detail);
      }
      const data = await response.json();
      localStorage.setItem("access", data.access);
      console.log("token was refreshed", data.access);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const checkValidToken = createAsyncThunk(
  "auth/checkValidToken",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const access = localStorage.getItem("access");
      if (!access) {
        throw new Error("no refresh token");
      }
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/verify/",
        {
          method: "POST",
          body: JSON.stringify({
            token: JSON.parse(access),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("token is not valid or expired");
        return rejectWithValue(errorData.detail);
      }

      console.log("token is valid");
      dispatch(addAuth());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const startTokenUpdate = createAsyncThunk(
  "auth/startTokenUpdate",
  async (_, { dispatch }) => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    refreshInterval = setInterval(() => {
      console.log("refreshin token");
      dispatch(refreshToken());
    }, 5 * 60 * 1000);
  }
);
export const stopTokenUpdate = createAsyncThunk(
  "auth/stopTokenUpdate",
  async (_, { dispatch }) => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(SignInSlice.actions.logout());
  }
);
const SignInSlice = createSlice({
  name: "signIn",
  initialState: {
    auth: false,
    isLoading: false,
    error: null as null | string,
  },
  reducers: {
    logout: (state) => {
      state.auth = false;
      (state.error = null), (state.isLoading = false);
    },
    addAuth: (state) => {
      state.auth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state) => {
      (state.auth = true), (state.isLoading = false);
    });
    builder.addCase(signInUser.pending, (state) => {
      (state.error = null), (state.isLoading = true);
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      (state.error = (action.payload as string) || "error!!!!!!"),
        (state.isLoading = false);
    });
  },
});
export const { addAuth } = SignInSlice.actions;
export default SignInSlice.reducer;
