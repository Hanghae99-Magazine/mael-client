import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../API.ts";

export const likeClick = createAsyncThunk(
  "like/likeClick",
  async (postId, { rejectWithValue }) => {
    try {
      return await URL.put(`/post/${postId}/like`, postId).then(
        (response) => response.data
      );
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
