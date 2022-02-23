import React, { useState } from "react";
import { BtnConfirm } from "../components/Buttons";
import { Text } from "../components/Inputs";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    user_id: "",
    nickname: "",
    user_pw: "",
    pw_Check: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleClick = () => {
    // console.log("아이디 :", user.user_id);
    // console.log("닉네임 :", user.nickname);
    // console.log("비밀번호 :", user.user_pw);
    // console.log("비밀번호 확인 :", user.pw_Check);
    dispatch(register(user));
  };
  console.log(user);
  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="title">Register</h1>
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
            type="text"
            title="닉네임"
            placeholder="닉네임을 입력해주세요"
            name="nickname"
            value={user.nickname}
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
          <Text
            type="password"
            title="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요"
            name="pw_Check"
            value={user.pw_Check}
            onChange={onChange}
          />
          <BtnConfirm title="Sign up" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Register;
