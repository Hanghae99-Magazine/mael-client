import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  user: {
    user_id: "",
    nickname: "",
    user_pw: "",
    mytoken: "",
  },
  isLoading: false,
  loginError: "",
  isLoggedin: false,
};

//로그인
export const login = createAsyncThunk(
  "user/login",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .post("http://3.36.75.239/login", _)
        .then((response) => response.data)
        .then((response) => {
          sessionStorage.setItem("mytoken", response.mytoken);
          console.log(response);
        });
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async () => {
  sessionStorage.removeItem("mytoken");
});

export const userReducer = createSlice({
  name: "user",
  initialState: userState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      //로그인
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedin = true;
        state.user = action.payload;
        // state.user.userId = action.payload.userId;
        // state.user.nickname = action.payload.nickname;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = true;
        state.loginError = action.payload;
      })
      // 로그아웃
      .addCase(logOut.pending, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedin = false;
      })
      .addCase(logOut.rejected, (state, action) => {});
  },
});

export default userReducer.reducer;
