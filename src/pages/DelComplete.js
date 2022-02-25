import React from "react";
import { Link } from "react-router-dom";

const DelComplete = () => {
  return (
    <div className="wrapper">
      <div className="delcom">
        <p>삭제가 완료되었습니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default DelComplete;
