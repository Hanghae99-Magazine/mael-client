import React from "react";

const LikeList = (props) => {
  const list = props.list;
  return (
    <div className="like-list">
      <div className="inbox">
        <div className="like-list-top">
          <p className="title">좋아요</p>
          <button
            className="close"
            onClick={() => {
              props.setIsModal(false);
            }}
          >
            닫기
          </button>
        </div>
        <div className="like-list-bottom">
          {list.length === 0 ? (
            <p className="mem-length">
              아직 아무도 좋아요를 누르지 않았어요 ㅠㅠ
            </p>
          ) : (
            <>
              <p className="mem-length">
                {list.length}명이 좋아요를 눌렀습니다.
              </p>
              <div className="like-user-inbox">
                {list.map((arr, index) => (
                  <p className="like-user" key={index}>
                    {arr}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeList;
