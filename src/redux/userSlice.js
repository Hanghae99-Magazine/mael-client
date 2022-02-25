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
  registerError: "",
  registerDone: false,
};
// 회원가입
export const register = createAsyncThunk(
  "user/register",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .post("http://3.36.75.239/register", _)
        .then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

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
          sessionStorage.setItem("nickname", response.nickname);
          // console.log(response);
        });
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

// 로그아웃
export const logOut = createAsyncThunk("user/logout", async () => {
  sessionStorage.removeItem("mytoken");
  sessionStorage.removeItem("nickname");
});

// 로그인 정보 확인
export const loginCheck = createAsyncThunk("userCheck", async () => {});

export const userReducer = createSlice({
  name: "user",
  initialState: userState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(register.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.registerDone = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerError = action.payload;
      })
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
      .addCase(logOut.rejected, (state, action) => {})
      // 로그인 체크
      .addCase(loginCheck.pending, (state, action) => {})
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.isLoggedin = true;
      })
      .addCase(loginCheck.rejected, (state, action) => {});
  },
});

export default userReducer.reducer;
