import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import useStories from "../hooks/useStories";
import { loadLocalStorage } from "../helpers";

function SuggestedStories({ handleAddStory }) {
  const numberOfTopStories = 3;
  const [list, setList] = useState([]);
  const [stories] = useStories(list, setList);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => res.json())
      .then((topStories) => {
        let stories = topStories
          // TODO cleanup
          // filters already used ID's
          .filter((id) =>
            loadLocalStorage().every((savedID) => savedID[0] !== id)
          )
          .slice(0, numberOfTopStories)
          .map((id) => [id]);
        setList(stories);
      });
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Suggested Stories</h3>
      <hr />
      <Stories
        stories={stories}
        list={list}
        buttonText="Follow"
        handleButtonClick={handleAddStory}
      />
    </div>
  );
}

export default SuggestedStories;
