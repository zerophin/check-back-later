import React from "react";

async function getStory(id) {
  try {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const story = await fetch(url);
    return await story.json();
  } catch (e) {
    console.log(e);
  }
}

export default getStory;
