import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Moment from "react-moment";

const Card = (props) => {
  const { name, date, image, like, desc, position } = props;
  const [isToggled, setIsToggled] = useState(false);

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
    setIsToggled((isToggled) => !isToggled);
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

  return (
    <div className="card">
      <div className="card-top">
        <h2 className="nickname">{name}</h2>
        <div className="card-date">
          <span>{displayCreatedAt(date)}</span>
          {visible ? (
            <button
              onClick={() => {
                console.log("수정");
              }}
            >
              수정
            </button>
          ) : (
            <></>
          )}
          {/* <button
            onClick={() => {
              console.log("수정");
            }}
          >
            수정
          </button> */}
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
          {isToggled ? (
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
    </div>
  );
};

export default Card;
