import React, { useState, useEffect } from "react";
import "./Latest-posts.scss";
import "../../../../Components/Post-item.scss";
import { Link } from "react-router-dom";
import comment from "../../../../Images/comment.png";

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts?_start=8&_end=16&_expand=user")
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

  return (
    <div className="latest-posts-wrapper">
      <h1>Latest posts</h1>
      {posts && posts.length > 0 ? (
        <div className="post-items">
          {posts.map((post, index) => (
            <div className="post-item" key={index}>
              <div className="post-item-container">
                <div className="profile-image-wrapper">
                  <img
                    className="profile-image"
                    src="https://xsgames.co/randomusers/avatar.php?g=male"
                    alt="profile"
                  />
                </div>
                <div className="name-box">
                  <Link to={`/json-api/user/${post.userId}`}>
                    <h4>{post.user.name}</h4>
                  </Link>
                  <span>{post.user.email}</span>
                </div>
                <p>{post.user.company.bs}</p>

                <div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
                <Link
                  className="comments-button"
                  to={`/json-api/posts/${post.id}`}
                >
                  <span>Comments</span>

                  <img src={comment} alt="comment" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default LatestPosts;
