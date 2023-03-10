import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import arrow from "../../Images/arrow.png";
import "./Posts.scss";

const Posts = () => {
  let { post } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

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
  };

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  return (
    <div className="container">
      <h1 className="posts-title">Recent posts</h1>
      <div className="page-wrapper">
        <div className="posts-wrapper">
          {posts.map((post, index) => (
            <div className="post-item" key={index}>
              <Link to={"/json-api/posts/" + post.id}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="comments-wrapper">
          <h2 className="comments-title">Comments</h2>
          {comments && comments.length > 0 ? (
            <div>
              {comments.map((comment, index) => (
                <div className="comment-wrapper" key={index}>
                  <h3 className="persons-name">{comment.name}</h3>
                  <span className="persons-email">{comment.email}</span>
                  <ReadMoreReact
                    text={comment.body}
                    min={80}
                    ideal={90}
                    max={100}
                    readMoreText="-read more"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No comments</p>
          )}
          <form onSubmit={newCommentHandler}>
            <div>
              <input
                type="text"
                value={name}
                onChange={nameHandler}
                placeholder="Comment title"
              />
              <input
                type="email"
                value={email}
                onChange={emailHandler}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <textarea
                value={body}
                onChange={bodyHandler}
                placeholder="Leave a comment..."
                cols="50"
              />
            </div>
            <button type="submit" className="arrow-icon-wrapper">
              <img className="arrow-icon" src={arrow} alt={"arrow"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;
