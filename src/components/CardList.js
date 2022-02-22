import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { getPosts } from "../redux/postSlice";

const CardList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  // const posts = [
  //     {
  //         "post_id" : 1,
  //         "nickname" : "ㅎㅇㅎㅇ",
  //         "post_img" : "https://img.catpre.com/web/catpre/event/popular_keyword_theme/22_pc_main_page_banner_0734.jpg",
  //         "post_content" : "하품하는 고먐미",
  //         "post_like" : 12,
  //         "upload_date" : "2022-2-19"
  //     },
  //     {
  //         "post_id":2,
  //         "nickname" : "ㅎㅇㅎㅇ",
  //         "post_img" : "https://img.catpre.com/web/catpre/event/popular_keyword_theme/22_pc_main_page_banner_0734.jpg",
  //         "post_content" : "하품하는 고먐미",
  //         "post_like" : 12,
  //         "upload_date" : "2022-2-19"
  //     },
  // ]
  return (
    <div className="card-list">
      {posts.map((post) => (
        <Card
          name={post.nickname}
          image={post.post_img}
          desc={post.post_content}
          like={post.post_like}
          date={post.upload_date}
          key={post.post_id}
        />
      ))}
    </div>
  );
};

export default CardList;
