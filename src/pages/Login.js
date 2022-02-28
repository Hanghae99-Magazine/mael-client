import React, { useState } from "react";
import { Link } from "react-router-dom";

// 컴포넌트
import { BtnConfirm } from "../components/Buttons";
import { Text } from "../components/Inputs";

//리덕스
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();

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

  const handleLogin = async () => {
    const loginData = {
      user_id: user.user_id,
      user_pw: user.user_pw,
    };
    return await dispatch(login(loginData)).then((res) => {
      console.log("res", res);
      if (res.payload.status === 201) {
        window.alert("로그인되었습니다.");
      } else {
        window.alert(res.payload.data.msg);
      }
    });
  };

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
          <Link className="goRegi" to="/register">
            회원이 아니신가요?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
