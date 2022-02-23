import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  user: {
    userId: "",
    nickname: "",
    userPw: "",
    pwCheck: "",
  },
  isLoading: false,
  loginError: "",
  isLoggedin: false,
  registerError: "",
  registerDone: false,
};

//회원가입
export const register = createAsyncThunk(
  "user/register",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .post("http://localhost:4000/user/register")
        .then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//로그인
export const login = createAsyncThunk(
  "user/login",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .post("http://3.36.75.239/login")
        // .get("http://localhost:4000/users")
        .then((response) => response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState: userState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      //회원가입
      .addCase(register.pending, () => {
        console.log("pending");
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
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
      });
    //로그아웃
  },
});

export default userReducer.reducer;
