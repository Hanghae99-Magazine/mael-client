import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import { userReducer } from "./userSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
