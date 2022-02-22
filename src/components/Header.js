import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../cookie";

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    let cookie = getCookie("user_id");
    console.log(cookie);
    if (cookie) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  if (isLoggedin) {
    return <Loggedin />;
  } else {
    return <NotLoggedin />;
  }
};

const Loggedin = () => {
  const logout = () => {
    deleteCookie("user_id");
  };
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
          <button className="hd-btn" onClick={logout}>
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
