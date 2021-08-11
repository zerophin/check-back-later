import React, { useEffect, useState } from "react";
import getStory from "./getStory";

function useStories(list) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    Promise.all(list.map((story) => getStory(story))).then(
      (storiesResponse) => {
        console.log("Adding stories");
        setStories(storiesResponse);
      }
    );
  }, [list]);

  return [stories, setStories];
}

export default useStories;
