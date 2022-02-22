import React, { useState, useRef, useEffect, useCallback } from "react";
import { BtnConfirm } from "../components/Buttons";

const Write = () => {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
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

  useEffect(() => {
    if (file !== "")
      setPreview(<img className="img_preview" alt="" src={previewURL}></img>);
    return () => {};
  }, [file, previewURL]);

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      setFile(file);
      setPreviewURL(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
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
          <p className="img-url">{previewURL}</p>
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
            onInput={handleResizeHeight}
          />
        </div>
        <BtnConfirm
          title="Posting"
          onClick={() => {
            console.log("click!!");
          }}
        />
      </div>
    </div>
  );
};

export default Write;
