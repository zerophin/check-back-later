import React from "react";

async function getStory(id) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const story = await fetch(url);
  const parsedStory = await story.json();
  return parsedStory;
}

export default getStory;
