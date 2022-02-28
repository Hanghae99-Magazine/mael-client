import React from "react";
import { Link } from "react-router-dom";

const LogOutComplete = () => {
  return (
    <div className="wrapper">
      <div className="delcom">
        <p>로그아웃이 완료되었습니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default LogOutComplete;
