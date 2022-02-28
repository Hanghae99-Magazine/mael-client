import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../API.ts";

const userState = {
  user: {
    // user_id: "",
    // nickname: "",
    // user_pw: "",
    // mytoken: "",
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
      return await URL.post("/register", _).then((response) => response);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response);
    }
  }
);

//로그인
export const login = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      return await URL.post("/login", loginData).then((response) => {
        console.log(response);
        if (response.status === 201) {
          window.alert("로그인되었습니다.");
          sessionStorage.setItem("mytoken", response.data.mytoken);
          sessionStorage.setItem("nickname", response.data.nickname);
          window.location.replace("/");
        }
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
      .addCase(register.pending, (state) => {
        console.log("pending");
        state.registerDone = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.registerDone = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerDone = false;
        state.registerError = action.payload;
      })
      //로그인
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = true;
        state.loginError = action.payload;
      })
      // 로그아웃
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedin = false;
      })
      // 로그인 체크
      .addCase(loginCheck.fulfilled, (state) => {
        state.isLoggedin = true;
      });
  },
});

export default userReducer.reducer;
