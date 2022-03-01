import React, { useState, useRef, useEffect, useCallback } from "react";
import { BtnConfirm } from "../components/Buttons";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { uploadPost } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인풋 파일
  const [file, setFile] = useState("");
  // 미리보기 주소
  const [previewURL, setPreviewURL] = useState("");
  // 미리보기
  const [preview, setPreview] = useState(null);
  // 파일 이름
  const [filename, setFilename] = useState("");
  // 포지션
  const [selected, setSelected] = useState("default");
  // 컨텐츠
  const [content, setContent] = useState("");

  // input file hidden
  const fileRef = useRef();

  // testarea 자동 높이
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

  // 이미지 프리뷰 보여주기
  useEffect(() => {
    if (file !== "")
      setPreview(<img className="img_preview" alt="" src={previewURL}></img>);
    return () => {};
  }, [file, previewURL]);

  // 파일 선택하기
  const handleFileOnChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setFilename(e.target.files[0].name);
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  // 파일 선택 버튼
  const handleClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  // 포지션 선택 버튼
  const handlePosition = (e) => {
    setSelected(e.target.value);
  };

  // 게시글 내용 작성하기
  const postContent = (e) => {
    setContent(e.target.value);
  };

  // 게시글 업로드 버튼
  const uploadFB = () => {
    let image = fileRef.current.files[0];
    const _upload = ref(storage, `images/${image.name}`);

    uploadBytes(_upload, image).then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(_upload).then((url) => {
        console.log(url);
        const postData = {
          img_position: selected,
          post_img: url,
          post_content: content,
        };
        dispatch(uploadPost(postData)).then((response) => {
          console.log(response);
          console.log(postData);
          navigate("/");
        });
      });
    });
  };

  return (
    <div className="write">
      <div className="wrapper">
        <h1 className="title">Posting</h1>
        <input
          ref={fileRef}
          className="imgInput"
          type="file"
          accept="image/*"
          name="file"
          id="postImg"
          onChange={handleFileOnChange}
          hidden={true}
        />
        <div className="img-upload">
          <p className="img-url">{filename}</p>
          <button className="img-btn" onClick={handleClick}>
            Uplaod
          </button>
        </div>
        <div className="img-preview">
          <p className="title">Preview</p>
          {preview}
        </div>
        <div className="post-text">
          <textarea
            ref={heightRef}
            className="description"
            placeholder="type something..."
            onChange={postContent}
            onInput={handleResizeHeight}
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
        <BtnConfirm title="Posting" onClick={uploadFB} />
      </div>
    </div>
  );
};

export default Write;
