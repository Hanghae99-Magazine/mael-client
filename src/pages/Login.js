import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnConfirm } from "../components/Buttons";
import { Text } from "../components/Inputs";
import { getCookie, setCookie, deleteCookie } from "../cookie";

const Login = () => {
  const navigate = useNavigate();
  // console.log(getCookie("user_id"));
  const [user, setUser] = useState({
    user_id: "",
    user_pw: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    setCookie("user_id", user.user_id, 3);
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
            name="user_id"
            value={user.user_id}
            onChange={onChange}
          />
          <Text
            type="password"
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            name="user_pw"
            value={user.user_pw}
            onChange={onChange}
          />
          <BtnConfirm title="Login" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
