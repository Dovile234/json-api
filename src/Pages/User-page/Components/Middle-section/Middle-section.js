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
  const [isValid, setIsValid] = useState(false);
  const [editId, setEditId] = useState(0);

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
        setIsValid(false);
      });
  }, [onId, isValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!title || !body) {
      return;
    }

    if (editId) {
      fetch(`http://localhost:3000/posts/${editId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setIsValid(true);
          console.log(json);
        });
      setTitle("");
      setBody("");
    } else {
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
          setIsValid(true);
          console.log(json);
        });
      setTitle("");
      setBody("");
    }
  };

  const deleteHandler = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    setIsValid(true);
  };

  const editHandler = (id) => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setEditId(id);
      });
  };

  const titleHandler = (event) => setTitle(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);

  return (
    <div className="posts-container">
      <h1>{user.name}</h1>
      <form onSubmit={submitHandler}>
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
        <button className="post-button" type="submit">
          Post
        </button>
      </form>

      {posts && posts.length > 0 ? (
        <div className="post-items">
          {posts.map((post, index) => (
            <div key={index} className="post-item">
              <div className="post-item-container">
                <div className="post-top">
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
                  <div className="buttons-wrapper">
                    <button
                      className="edit-button"
                      onClick={() => editHandler(post.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteHandler(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="info-body">
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

export default MiddleSection;
