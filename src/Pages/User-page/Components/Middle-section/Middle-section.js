import React, { useState, useEffect } from "react";
import "../../../../Components/Post-item.scss";
import "./Middle-section.scss";
import comment from "../../../../Images/comment.png";
import { Link } from "react-router-dom";

const MiddleSection = ({ onId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${onId}`)
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${onId}/posts`)
      .then((res) => res.json())
      .then((userData) => {
        setPosts(userData);
        setIsPosted(false);
      });
  }, [onId, isPosted]);

  const newPostHandler = (event) => {
    event.preventDefault();
    if (!title || !body) {
      return;
    }

    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: Number(onId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setIsPosted(true);
        console.log(json);
      });
    setTitle("");
    setBody("");
  };

  const titleHandler = (event) => setTitle(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);

  return (
    <div className="posts-container">
      <h1>{user.name}</h1>
      <form onSubmit={newPostHandler}>
        <input
          className="post-title"
          value={title}
          onChange={titleHandler}
          type="text"
          placeholder="Title"
          required
        />
        <textarea
          className="post-body"
          value={body}
          onChange={bodyHandler}
          type="text"
          placeholder="Write something..."
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="post-items">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <div className="post-item-container">
              <div className="profile-image-wrapper">
                <img
                  className="profile-image"
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  alt="profile"
                />
              </div>
              <div className="name-box">
                <h4>{user.name}</h4>
                <span>{user.email}</span>
              </div>
              {/* <p>{user.company.bs}</p> */}

              <div className="info-body">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
              <Link to={`/json-api/posts/${post.id}`}>
                <span>Comments</span>

                <img src={comment} alt="comment" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleSection;
