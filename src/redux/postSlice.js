import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../API.ts";

export const getPosts = createAsyncThunk(
  "post/posts",
  async (_, { rejectWithValue }) => {
    try {
      return await URL.get("/post", _).then((response) => response.data);
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
      return await URL.post("/post", _).then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (data, { rejectWithValue }) => {
    try {
      return await URL.delete(`/post/${data}`).then(
        (response) => response.data
      );
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editPost = createAsyncThunk(
  "post/edit",
  async (data, { rejectWithValue }) => {
    try {
      return await URL.put(`/post/${data.postId}`, data).then(
        (response) => response.data
      );
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
      // 목록 가져오기
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      // 업로드
      .addCase(uploadPost.pending, () => {
        console.log("pending");
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(uploadPost.rejected, () => {})
      // 삭제
      .addCase(deletePost.pending, () => {
        console.log("pending");
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(deletePost.rejected, () => {})
      // 수정
      .addCase(editPost.pending, () => {
        console.log("pending");
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(editPost.rejected, () => {});
  },
});

export default postReducer.reducer;
