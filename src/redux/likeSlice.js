import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mytoken = sessionStorage.getItem("mytoken");

export const likeClick = createAsyncThunk(
  "like/likeClick",
  async (postId, { rejectWithValue }) => {
    try {
      return await axios
        .put(`http://3.36.75.239/post/${postId}/like`, postId, {
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

export const likeReducer = createSlice({
  name: "like",
  initialState: {
    like_check: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeClick.pending, (state, action) => {})
      .addCase(likeClick.fulfilled, (state, action) => {
        state.like_check = action.payload;
      })
      .addCase(likeClick.rejected, (state, action) => {});
  },
});

export default likeReducer.reducer;
