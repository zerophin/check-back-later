import React from "react";

function Story({ post, handleDelete, previousCount }) {
  return (
    <li>
      {post.title ? (
        <>
          <a href={`https://news.ycombinator.com/item?id=${post.id}`}>
            {post.title} || {post.descendants} ||{" "}
            {post.descendants - previousCount || "no"} new comments
          </a>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </li>
  );
}

export default Story;
