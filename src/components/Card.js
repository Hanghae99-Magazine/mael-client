import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Moment from "react-moment";
import "moment/locale/ko";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/postSlice";
import { likeClick } from "../redux/likeSlice";
import { useNavigate } from "react-router-dom";
import LikeList from "./LikeList";

const Card = (props) => {
  const { name, date, image, likeCount, likeList, desc, position, postId } =
    props;
  const myNick = sessionStorage.getItem("nickname");

  const is_login = useSelector((state) => state.user.isLoggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likeToggled, setLikeToggled] = useState(false);
  const [visible, setVislble] = useState(false);
  const [likeCnt, setLikeCnt] = useState(likeCount);
  const [isModal, setIsModal] = useState(false);

  // 수정, 삭제버튼 숨기기
  useEffect(() => {
    if (myNick === name) {
      setVislble(true);
    } else {
      setVislble(false);
    }
  }, [myNick, name]);

  // 좋아요 체크
  useEffect(() => {
    if (likeList.includes(myNick)) {
      setLikeToggled(true);
    } else {
      setLikeToggled(false);
    }
  }, [likeList, myNick]);

  // 좋아요 토글
  const handleToggle = () => {
    if (is_login === true) {
      dispatch(likeClick(postId)).then((response) => {
        console.log(response);
        if (!likeToggled) {
          setLikeToggled(true);
          setLikeCnt(likeCnt + 1);
        } else {
          setLikeToggled(false);
          setLikeCnt(likeCnt - 1);
        }
      });
    } else {
      alert("로그인 후 이용가능합니다.");
    }
  };

  // 좋아요 모달창
  const handlaModal = () => {
    setIsModal(true);
  };

  // 시간 표시
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

  // 상세 버튼
  const handleDetail = () => {
    navigate(`${postId}/detail`, { state: props });
  };

  // 수정 버튼
  const handleModify = () => {
    navigate(`/modify`, { state: props });
  };

  // 삭제 버튼
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
        {isModal === true ? (
          <LikeList list={props.likeList} setIsModal={setIsModal} />
        ) : null}
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
          onClick={handleDetail}
        ></div>
        <div className="card-bottom">
          <button className="btn-like" onClick={handleToggle}>
            {likeToggled ? (
              <MdFavorite fontSize="28" />
            ) : (
              <MdFavoriteBorder fontSize="28" />
            )}
          </button>
          <button className="btn-like-list" onClick={handlaModal}>
            좋아요 {likeCnt}개 ...더보기
          </button>
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
        {isModal === true ? (
          <LikeList list={props.likeList} setIsModal={setIsModal} />
        ) : null}
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleDetail}
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
            <button className="btn-like-list" onClick={handlaModal}>
              좋아요 {likeCnt}개 ...더보기
            </button>
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
        {isModal === true ? (
          <LikeList list={props.likeList} setIsModal={setIsModal} />
        ) : null}
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
            <button className="btn-like-list" onClick={handlaModal}>
              좋아요 {likeCnt}개 ...더보기
            </button>
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
          onClick={handleDetail}
        ></div>
      </div>
    );
  }
};

export default Card;
