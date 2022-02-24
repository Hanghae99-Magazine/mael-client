import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mytoken = sessionStorage.getItem("mytoken");
// console.log(mytoken);

export const getPosts = createAsyncThunk(
  "post/posts",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://3.36.75.239/post")
        .then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadPost = createAsyncThunk(
  "post/upload",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .post("http://3.36.75.239/post", _, {
          headers: {
            Authorization: `Bearer ${mytoken}`,
          },
        })
        .then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const postReducer = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(uploadPost.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(uploadPost.rejected, (state, action) => {});
  },
});

export default postReducer.reducer;

// 원진님 http://3.36.75.239
// 강효님 http://hyoc.shop/
// 수현님 http://54.180.142.123/
