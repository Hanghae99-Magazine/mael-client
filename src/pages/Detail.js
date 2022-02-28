import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/ko";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { likeClick } from "../redux/likeSlice";
import { deletePost } from "../redux/postSlice";
import LikeList from "../components/LikeList";

const Detail = () => {
  // props
  const props = useLocation().state;
  console.log(props);

  // state
  const [likeToggled, setLikeToggled] = useState(false);
  const [likeCnt, setLikeCnt] = useState(props.likeCount);
  const [isModal, setIsModal] = useState(false);
  const [visible, setVislble] = useState(false);

  // redux
  const is_login = useSelector((state) => state.user.isLoggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myNick = sessionStorage.getItem("nickname");

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
  // 수정, 삭제버튼 숨기기
  useEffect(() => {
    if (myNick === props.name) {
      setVislble(true);
    } else {
      setVislble(false);
    }
  }, [myNick, props.name]);

  // 좋아요 토글
  const handleToggle = () => {
    if (is_login === true) {
      dispatch(likeClick(props.postId)).then((response) => {
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

  // 좋아요 체크
  useEffect(() => {
    if (props.likeList.includes(myNick)) {
      setLikeToggled(true);
    } else {
      setLikeToggled(false);
    }
  }, [props.likeList, myNick]);

  // 좋아요 모달창
  const handlaModal = () => {
    setIsModal(true);
  };

  // 수정 버튼
  const handleModify = () => {
    navigate(`/modify`, { state: props });
  };

  // 삭제 버튼
  const handleDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      dispatch(deletePost(props.postId)).then((response) => {
        console.log(response);
        navigate("/deletecomplete");
      });
    } else {
      alert("취소하셨습니다.");
    }
  };

  return (
    <div className="card-detail">
      {isModal === true ? (
        <LikeList list={props.likeList} setIsModal={setIsModal} />
      ) : null}
      <div className="wrapper">
        <div className="contents">
          <img className="detail-image" src={`${props.image}`} alt="이미지" />
          <div className="detail-top">
            <h1 className="nickname">{props.name}</h1>
            <div>
              {visible ? (
                <>
                  <button className="detail-btn" onClick={handleModify}>
                    수정
                  </button>
                  <button className="detail-btn" onClick={handleDelete}>
                    삭제
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="detail-mid">
            <p className="detail-content">{props.desc}</p>
            <p className="detail-date">{displayCreatedAt(props.date)}</p>
            <div className="detail-like">
              <button className="detail-btn-like" onClick={handleToggle}>
                {likeToggled ? (
                  <MdFavorite fontSize="28" />
                ) : (
                  <MdFavoriteBorder fontSize="28" />
                )}
              </button>
              <button className="detail-like-list" onClick={handlaModal}>
                좋아요 {likeCnt}개 ...더보기
              </button>
            </div>
          </div>
          <div className="detail-comment">
            <p className="title">comment</p>
            <p className="default-msg">코멘트가 없어욥</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
