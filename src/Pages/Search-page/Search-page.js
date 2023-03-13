import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Search-page.scss";

const SearchPage = () => {
  let { phrase } = useParams();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users?q=${phrase}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [phrase]);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?q=${phrase}&_limit=15`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [phrase]);

  useEffect(() => {
    fetch(`http://localhost:3000/comments?q=${phrase}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, [phrase]);

  return (
    <div className="container">
      <h1 className="search-title">Search results</h1>
      <div className="results-wrapper">
        {posts && posts.length > 0 ? (
          <div className="wrapper">
            <h2>Posts ({posts.length})</h2>
            {posts.map((post, index) => (
              <Link to={`/json-api/posts/${post.id}`} key={index}>
                {" "}
                <p>{post.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}

        {comments && comments.length > 0 ? (
          <div className="wrapper">
            <h2>Comments ({comments.length})</h2>
            {comments.map((comment, index) => (
              <Link to={`/json-api/posts/${comment.postId}`} key={index}>
                <p>{comment.name}</p>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}

        {users && users.length > 0 ? (
          <div className="wrapper">
            <h2>Users ({users.length})</h2>
            {users.map((user, index) => (
              <Link to={`/json-api/user/${user.id}`} key={index}>
                <p>{user.name}</p>
              </Link>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchPage;
