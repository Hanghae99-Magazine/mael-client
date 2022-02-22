import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/posts",
  async (_, { rejectWithValue }) => {
    // const response = await axios.get("http://localhost:4000/posts")
    // return response.data
    try {
      return await axios
        .get("http://localhost:4000/posts")
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
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postReducer.reducer;
