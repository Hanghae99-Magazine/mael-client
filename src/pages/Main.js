import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BtnPost } from "../components/Buttons";
import CardList from "../components/CardList";

const Main = () => {
  const navigate = useNavigate();
  const is_login = useSelector((state) => state.user.isLoggedin);

  const handleClicked = () => {
    if (is_login) {
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
