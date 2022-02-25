import React, { useState, useRef, useEffect, useCallback } from "react";
import { BtnConfirm } from "../components/Buttons";
import { useDispatch } from "react-redux";
import { editPost } from "../redux/postSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Modify = () => {
  const location = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 포지션
  const [selected, setSelected] = useState(location.position);
  // 컨텐츠
  const [content, setContent] = useState(location.desc);

  // testarea 자동 높이 조절 코드
  const heightRef = useRef();

  useEffect(() => {
    if (heightRef === null || heightRef.current === null) {
      return;
    }
    heightRef.current.style.height = "38px";
    heightRef.current.style.height = heightRef.current.scrollHeight + "px";
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (heightRef === null || heightRef.current === null) {
      return;
    }
    heightRef.current.style.height = "38px";
    heightRef.current.style.height = heightRef.current.scrollHeight + "px";
  }, []);

  // 게시글 포지션 선택하기
  const handlePosition = (e) => {
    setSelected(e.target.value);
  };

  // 게시글 내용 작성하기
  const postContent = (e) => {
    setContent(e.target.value);
  };

  // 게시글 업로드 버튼
  const uploadPost = () => {
    const postData = {
      postId: location.postId,
      img_position: selected,
      post_img: location.image,
      post_content: content,
    };
    dispatch(editPost(postData)).then((response) => {
      console.log(response);
      console.log(postData);
      navigate("/");
    });
  };

  return (
    <div className="write">
      <div className="wrapper">
        <h1 className="title" style={{ paddingBottom: "20px" }}>
          Edit post
        </h1>
        <div className="img-preview">
          <img className="img_preview" src={location.image} alt="" />
        </div>
        <div className="post-text">
          <textarea
            ref={heightRef}
            className="description"
            placeholder="type something..."
            onChange={postContent}
            onInput={handleResizeHeight}
            defaultValue={location.desc}
          />
        </div>
        <div className="post-position">
          <p className="title" style={{ fontSize: "2rem" }}>
            Position
          </p>
          <div className="pp-inbox">
            <input
              className="position-input"
              id="left"
              type="radio"
              name="position"
              value="left"
              onChange={handlePosition}
              checked={selected === "left"}
              hidden={true}
            />
            <label htmlFor="left" className="position-btn">
              left
            </label>
            <input
              className="position-input"
              id="default"
              type="radio"
              name="position"
              value="default"
              onChange={handlePosition}
              checked={selected === "default"}
              hidden={true}
            />
            <label htmlFor="default" className="position-btn">
              default
            </label>
            <input
              className="position-input"
              id="right"
              type="radio"
              name="position"
              value="right"
              onChange={handlePosition}
              checked={selected === "right"}
              hidden={true}
            />
            <label htmlFor="right" className="position-btn">
              right
            </label>
          </div>
        </div>
        <BtnConfirm title="Posting" onClick={uploadPost} />
      </div>
    </div>
  );
};

export default Modify;
