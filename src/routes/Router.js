import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Header from "../components/Header";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Write from "../pages/Write";
import DelComplete from "../pages/DelComplete";
import Modify from "../pages/Modify";
import LogOutComplete from "../pages/LogOutComplete";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path=":postId/modify" element={<Modify />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="write" element={<Write />} />
        <Route path="deletecomplete" element={<DelComplete />} />
        <Route path="logout" element={<LogOutComplete />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
