import React, { memo, useCallback, useEffect, useState } from "react";
import getStory from "./getStory";

function useStories(list) {
  const [stories, setStories] = useState([]);
  const [storyID, setStoryID] = useState([]);
  useEffect(() => {
    let idList = list.map((story) => +story[0]);
    setStoryID(idList);
  }, [list]);

  useEffect(() => {
    if (!storyID.length) return;
    Promise.all(storyID.map((story) => getStory(story)))
      .then((storiesResponse) => {
        console.log("Setting stories in useStories");
        setStories(storiesResponse);
      })
      .catch((e) => {
        if (e.message === "Invalid URL") {
          alert(`Problem fetching ${e.id}.\nCheck the URL and try again`);
        } else {
          console.error(e);
        }
      });
  }, [storyID]);

  return [stories];
}

export default useStories;
