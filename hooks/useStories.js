import React, { useEffect, useState } from "react";
import getStory from "./getStory";

function useStories(list) {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    Promise.all(list.map((story) => getStory(story)))
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
  }, [list]);

  return [stories];
}

export default useStories;
