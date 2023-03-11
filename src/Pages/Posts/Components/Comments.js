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
  const [isPosted, setIsPosted] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${post}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setIsPosted(false);
      });
  }, [post, isPosted]);

  const newCommentHandler = (event) => {
    event.preventDefault();
    setAlert("alert");
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
        setIsPosted(true);
        console.log(json);
      });
    setAlert("");
    setName("");
    setBody("");
    setEmail("");
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
                  <h3 className="persons-name">{comment.name}</h3>
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
        <form onSubmit={newCommentHandler}>
          <div>
            <input
              className={!name ? `input ${alert}` : "input"}
              type="text"
              value={name}
              onChange={nameHandler}
              placeholder="Enter your name"
            />
            <input
              className={!email ? `input ${alert}` : "input"}
              type="email"
              value={email}
              onChange={emailHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="textarea-wrapper">
            <textarea
              className={!body ? alert : ""}
              value={body}
              onChange={bodyHandler}
              placeholder="Add a comment..."
              cols="50"
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
