import React from "react";

async function getStory(id) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return fetch(url).then((res) => res.json());
  //return {};
}

export default getStory;
