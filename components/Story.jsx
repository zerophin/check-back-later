import React, { useEffect, useState } from "react";

function Story({ post }) {
  return (
    <li>
      {post.title ? (
        <a href={`https://news.ycombinator.com/item?id=${post.id}`}>
          {post.title} || {post.descendants}
        </a>
      ) : (
        <span>Loading...</span>
      )}
    </li>
  );
}

export default Story;
