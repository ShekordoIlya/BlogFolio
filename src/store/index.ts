import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import counterSlice from "./counterSlice";
import postSlice from "./postSlice";
import UserSlice from "./userSlice";
import { thunk } from "redux-thunk";
import { logger } from "./Middlewares/logger";
import { fetchPostsMiddlware } from "./Middlewares/fetchPostsMiddlware";
import paginationSlice from "./pagination";
import { incrementMiddleWare } from "./Middlewares/incrementMiddleware";
import SignInSlice from "./SignInSlice";
import myPostsSlice from "./myPostsSlice";
export default configureStore({
  reducer: {
    themeInStoreConfiguration: themeSlice,
    counter: counterSlice,
    // posts: postSlice,
    pagination: paginationSlice,
    user: UserSlice,
    signIn: SignInSlice,
    myPosts: myPostsSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(thunk);
  },
});
