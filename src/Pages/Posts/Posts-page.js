import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Comments from "./Components/Comments";
import "./Posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="posts-title">All posts</h1>
      <div className="page-wrapper">
        <div className="posts-container">
          {posts && posts.length > 0 ? (
            <div className="posts-wrapper">
              {posts.map((post, index) => (
                <NavLink key={index} to={"/json-api/posts/" + post.id}>
                  <div className="inner-post-item">
                    <img
                      src="https://xsgames.co/randomusers/avatar.php?g=male"
                      alt="profile"
                    />
                    <div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-body">{post.body}</p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Comments />
      </div>
    </div>
  );
};

export default Posts;
