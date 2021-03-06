import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { getPosts } from "../redux/postSlice";

const CardList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts.posts);
  // console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="card-list">
      {posts &&
        posts.map((post) => (
          <Card
            name={post.nickname}
            image={post.post_img}
            desc={post.post_content}
            likeCount={post.post_like}
            likeList={post.like_list}
            date={post.upload_date}
            key={post.post_id}
            postId={post.post_id}
            position={post.img_position}
          />
        ))}
    </div>
  );
};

export default CardList;
