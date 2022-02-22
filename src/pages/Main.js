import React from "react";
import { useNavigate } from "react-router-dom";
import { BtnPost } from "../components/Buttons";
import CardList from "../components/CardList";

const Main = () => {
  const navigate = useNavigate();
  const handleClicked = () => {
    navigate("write");
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
