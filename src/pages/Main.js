import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnPost } from "../components/Buttons";
import CardList from "../components/CardList";
import { getCookie } from "../cookie";

const Main = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    let cookie = getCookie("userId");
    if (cookie) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);

  const handleClicked = () => {
    if (isLoggedin) {
      navigate("/write");
    } else {
      window.alert("포스팅하기 위해 로그인해주세요");
      navigate("/login");
    }
  };

  return (
    <div className="main">
      <div className="wrapper">
        <CardList />
        <BtnPost onClick={handleClicked} />
      </div>
    </div>
  );
};

export default Main;
