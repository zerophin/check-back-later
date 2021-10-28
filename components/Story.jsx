import React from "react";
import styles from "../styles/Story.module.css";

function Story({
  post,
  handleButtonClick,
  previousCount,
  handleClick,
  buttonText,
}) {
  const newComments = post.descendants - previousCount;
  //TODO fix styling
  return (
    <li className={styles.listItem}>
      {post.title ? (
        <>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://news.ycombinator.com/item?id=${post.id}`}
            onClick={() => {
              if (handleClick) handleClick(post.id);
            }}
          >
            {post.title}
            <span className={styles.metaData}>
              {post.descendants}{" "}
              {previousCount && (
                <span>
                  | {newComments > 0 ? newComments : "no"}
                  {` `}
                  new
                  {` `}
                </span>
              )}
              {newComments === 1 ? "comment" : "comments"}
            </span>
          </a>
          <button
            className={styles.button}
            onClick={() => handleButtonClick(post.id)}
          >
            {buttonText}
          </button>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </li>
  );
}

export default Story;
