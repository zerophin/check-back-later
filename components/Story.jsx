import React from "react";
import styles from "../styles/Story.module.css";

function Story({ post, handleDelete, previousCount, handleClick }) {
  const newComments = post.descendants - previousCount;

  return (
    <li className={styles.listItem}>
      {post.title ? (
        <>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://news.ycombinator.com/item?id=${post.id}`}
            onClick={() => handleClick(post.id)}
          >
            {post.title} || {post.descendants} ||{" "}
            {newComments > 0 ? newComments : "no"} new comments
          </a>
          <button
            className={styles.button}
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </li>
  );
}

export default Story;
