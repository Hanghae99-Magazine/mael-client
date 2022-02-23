import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { getPosts } from "../redux/postSlice";

const CardList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="card-list">
      {posts &&
        posts.map((post) => (
          <Card
            name={post.userId}
            image={post.img}
            desc={post.content}
            // like={data.post_like}
            date={post.createdAt}
            key={post.postId}
          />
        ))}
    </div>
  );
};

export default CardList;
