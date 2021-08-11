import React, {useEffect, useState} from 'react';

function Thread({website, id}) {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const realId = id;
    const url = `https://hacker-news.firebaseio.com/v0/item/${realId}.json`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPosts(data)
      })
    console.log("woop woop")
  }, [])

  return (
    <li>
    {
      posts.title ?
        <a href={`https://news.ycombinator.com/item?id=${id}`}>{posts.title} || {posts.descendants}</a>
        :
        <span>Loading...</span>
    }
    </li>
  );
}

export const MemoizedThread = React.memo(Thread);
