import React, { useState } from "react";

const MiddleSection = ({ onId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${onId}?_embed=posts`)
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData);
      });
  }, []);

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
      .then((json) => console.log(json));
    setTitle("");
    setBody("");
  };

  const titleHandler = (event) => setTitle(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);

  return (
    <div className="posts-container">
      <form onSubmit={newPostHandler}>
        <input
          className="post-title"
          value={title}
          onChange={titleHandler}
          type="text"
        />
        <input
          className="post-body"
          value={body}
          onChange={bodyHandler}
          type="text"
        />
        <button type="submit">click</button>
      </form>
    </div>
  );
};

export default MiddleSection;
