import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/postSlice";
import { likeClick } from "../redux/likeSlice";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const { name, date, image, like, desc, position, postId } = props;
  const likeState = useSelector((state) => state.like.like_check);
  console.log(likeState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likeToggled, setLikeToggled] = useState(false);
  const [visible, setVislble] = useState(false);
  const myNick = sessionStorage.getItem("nickname");

  useEffect(() => {
    if (myNick === name) {
      setVislble(true);
    } else {
      setVislble(false);
    }
  }, []);

  const handleToggle = () => {
    dispatch(likeClick(postId)).then((response) => {
      console.log(response);
      if (likeClick) {
        setLikeToggled(true);
      } else {
        setLikeToggled(false);
      }
    });
  };

  const displayCreatedAt = (date) => {
    let startTime = new Date(date);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  const handleModify = () => {
    console.log("수정");
  };

  const handleDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      dispatch(deletePost(postId)).then((response) => {
        console.log(response);
        navigate("/deletecomplete");
      });
    } else {
      alert("취소하셨습니다.");
    }
  };

  if (position === "default") {
    return (
      <div className="card">
        <div className="card-top">
          <h2 className="nickname">{name}</h2>
          <div className="card-date">
            <span>{displayCreatedAt(date)}</span>
            {visible ? (
              <>
                <button onClick={handleModify}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="card-bottom">
          <button className="btn-like" onClick={handleToggle}>
            {likeToggled ? (
              <MdFavorite fontSize="28" />
            ) : (
              <MdFavoriteBorder fontSize="28" />
            )}
          </button>
          <span>좋아요 {like}개</span>
        </div>
        <div className="card-desc">
          <p>{desc}</p>
        </div>
        <div className="card-comment">
          <p className="title">comments</p>
          <p className="default-msg">nothing in here...</p>
        </div>
      </div>
    );
  } else if (position === "left") {
    return (
      <div className="card-left">
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="card-contents">
          <div className="card-content-top">
            <h2 className="nickname">{name}</h2>
            <div className="card-mod">
              {visible ? (
                <>
                  <button onClick={handleModify}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="card-desc">
            <p>{desc}</p>
          </div>
          <div className="card-like">
            <button className="btn-like" onClick={handleToggle}>
              {likeToggled ? (
                <MdFavorite fontSize="20" />
              ) : (
                <MdFavoriteBorder fontSize="20" />
              )}
            </button>
            <span>좋아요 {like}개</span>
          </div>
          <div className="card-date">
            <span>{displayCreatedAt(date)}</span>
          </div>
          <div className="card-comment">
            <p className="title">comments</p>
            <p className="default-msg">nothing in here...</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-left">
        <div className="card-contents">
          <div className="card-content-top">
            <h2 className="nickname">{name}</h2>
            <div className="card-mod">
              {visible ? (
                <>
                  <button onClick={handleModify}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="card-desc">
            <p>{desc}</p>
          </div>
          <div className="card-like">
            <button className="btn-like" onClick={handleToggle}>
              {likeToggled ? (
                <MdFavorite fontSize="20" />
              ) : (
                <MdFavoriteBorder fontSize="20" />
              )}
            </button>
            <span>좋아요 {like}개</span>
          </div>
          <div className="card-date">
            <span>{displayCreatedAt(date)}</span>
          </div>
          <div className="card-comment">
            <p className="title">comments</p>
            <p className="default-msg">nothing in here...</p>
          </div>
        </div>
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    );
  }
};

export default Card;
