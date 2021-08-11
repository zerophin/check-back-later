import React, { useEffect, useState } from "react";
import getStory from "./getStory";

function useStories(list) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    Promise.all(list.map((story) => getStory(story))).then((res) => {
      if (res.length > 0) {
        setStories(res);
      }
    });
  }, [list]);

  return [stories];
}

export default useStories;
