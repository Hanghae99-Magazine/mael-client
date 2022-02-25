import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import likeReducer from "./likeSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    like: likeReducer,
  },
});
