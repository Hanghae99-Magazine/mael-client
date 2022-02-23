import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// 컴포넌트
import { BtnConfirm } from "../components/Buttons";
import { Text } from "../components/Inputs";

//쿠키
import { setCookie } from "../cookie";

//리덕스
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const loginState = useSelector((state) => state.user.user);
  console.log("로그인", loginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(getCookie("user_id"));
  const [user, setUser] = useState({
    userId: "",
    userPw: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (user) => {
    setCookie("userId", user.userId, 3);
    dispatch(login(user));
    navigate("/");
  };
  console.log(user);
  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="title">Login</h1>
        <div className="content">
          <Text
            type="text"
            title="아이디"
            placeholder="아이디를 입력해주세요"
            name="userId"
            value={user.userId}
            onChange={onChange}
          />
          <Text
            type="password"
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            name="userPw"
            value={user.userPw}
            onChange={onChange}
          />
          <BtnConfirm title="Login" onClick={handleLogin} />
          <Link className="goRegi" to="/register">
            회원이 아니신가요?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
