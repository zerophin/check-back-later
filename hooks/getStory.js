import React from "react";

async function getStory(id) {
  console.log("getting", id);
  try {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const story = await fetch(url);
    const parsedStory = await story.json();
    return parsedStory;
  } catch (e) {
    console.log(e);
  }
}

export default getStory;
