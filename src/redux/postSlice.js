import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/posts",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        // .get("http://localhost:4000/post")
        .get("http://3.36.75.239/post")
        .then((response) => response.data);
      // .then((response) => console.log(response.data));
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
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postReducer.reducer;

// 3.36.75.239 id: won1 pw: won12
// won3 won13
// http://hyoc.shop/
