import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/userSlice";

const Header = () => {
  const is_login = useSelector((state) => state.user.isLoggedin);
  console.log("is_login", is_login);
  const token = sessionStorage.getItem("mytoken");
  console.log("token", token);

  if (token && is_login) {
    return <Loggedin />;
  } else {
    return <NotLoggedin />;
  }
};

const Loggedin = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="wrap">
        <Link to="/">
          <h1 className="logo">MAGAZINE</h1>
        </Link>
        <div className="btn-wrap">
          <Link className="hd-btn" to="">
            <span>알림</span>
            <span className="hd-badge">0</span>
          </Link>
          <button
            className="hd-btn"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

const NotLoggedin = () => {
  return (
    <div className="header">
      <div className="wrap">
        <Link to="/">
          <h1 className="logo">MAGAZINE</h1>
        </Link>
        <div className="btn-wrap">
          <Link className="hd-btn" to="register">
            회원가입
          </Link>
          <Link className="hd-btn" to="login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
