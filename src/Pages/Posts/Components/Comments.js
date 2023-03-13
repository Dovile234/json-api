import React, { useState, useEffect } from "react";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import arrow from "../../../Images/arrow.png";
import { useParams } from "react-router-dom";

const Comments = () => {
  let { post } = useParams();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [editId, setEditId] = useState(0);

  const deleteHandler = (id) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
    });
    setIsValid(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${post}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setIsValid(false);
      });
  }, [post, isValid]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (editId) {
      fetch(`http://localhost:3000/comments/${editId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          body,
          email,
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
      setName("");
      setBody("");
      setEmail("");
    } else {
      if (!name || !email || !body) {
        return;
      }

      fetch("http://localhost:3000/comments", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          body,
          postId: Number(post),
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
      setName("");
      setBody("");
      setEmail("");
    }
  };

  const editHandler = (id) => {
    fetch(`http://localhost:3000/comments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBody(data.body);
        setName(data.name);
        setEmail(data.email);
        setEditId(id);
      });
  };

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  return (
    <div className="comments-container">
      <h2 className="comments-title">Comments</h2>
      <div className="comments-wrapper">
        {comments && comments.length > 0 ? (
          <div className="comment-wrapper">
            {comments.map((comment, index) => (
              <div className="comment-item" key={index}>
                <div className="profile-picture-wrapper">
                  <img
                    className="profile-picture"
                    src="https://xsgames.co/randomusers/avatar.php?g=female"
                    alt="profile"
                  />
                </div>

                <div className="comment-content-wrapper">
                  <div className="title-wrapper">
                    <h3 className="persons-name">{comment.name}</h3>
                    <div className="buttons-wrapper">
                      <button
                        className="edit-button"
                        onClick={() => editHandler(comment.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteHandler(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <span className="persons-email">{comment.email}</span>
                  <ReadMoreReact
                    text={comment.body}
                    min={80}
                    ideal={90}
                    max={100}
                    readMoreText={<span className="show-more">-Show more</span>}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments</p>
        )}
      </div>

      {post && post.length > 0 && (
        <form onSubmit={submitHandler}>
          <div>
            <div className="input-box">
              <input
                className="input"
                type="text"
                value={name}
                onChange={nameHandler}
                required="required"
              />
              <span>Full Name</span>
            </div>
            <div className="input-box">
              <input
                className="input"
                type="email"
                value={email}
                onChange={emailHandler}
                required="required"
              />
              <span>Email</span>
            </div>
          </div>
          <div className="textarea-wrapper">
            <textarea
              value={body}
              onChange={bodyHandler}
              placeholder="Add a comment..."
              cols="50"
              required="required"
            />
            <button type="submit" className="arrow-icon-wrapper">
              <img className="arrow-icon" src={arrow} alt={"arrow"} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comments;
