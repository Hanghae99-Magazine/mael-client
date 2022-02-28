import React, { useState } from "react";
import { BtnConfirm } from "../components/Buttons";
import { Text } from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

const Register = () => {
  // const registerDone = useSelector((state) => state.user.registerDone);
  // console.log(registerDone);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_id: "",
    nickname: "",
    user_pw: "",
    pw_check: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleClick = async () => {
    const userData = {
      user_id: user.user_id,
      nickname: user.nickname,
      user_pw: user.user_pw,
      pw_check: user.pw_check,
    };
    return await dispatch(register(userData)).then((response) => {
      console.log(response);
      if (response.payload.status === 201) {
        window.alert("회원가입에 성공했습니다.");
        navigate("/login");
      } else {
        window.alert(response.payload.data.msg);
      }
    });
  };
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
            name="pw_check"
            value={user.pw_check}
            onChange={onChange}
          />
          <BtnConfirm title="Sign up" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Register;
