import React from "react";

async function getStory(id) {
  console.log("getting", id);
  // try {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const story = await fetch(url);
  const parsedStory = await story.json();
  if (!parsedStory || !parsedStory.type || parsedStory.type !== "story") {
    let error = new Error();
    error = { ...error, message: "Invalid URL", url, id };
    throw error;
  }
  return parsedStory;
  // }
  // catch (e) {
  //   console.error(e);
  // }
}

export default getStory;
