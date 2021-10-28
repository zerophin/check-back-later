import React, { useEffect, useState } from "react";
import Stories from "./Stories";
import useStories from "../hooks/useStories";

function SuggestedStories({ handleAddStory }) {
  const numberOfTopStories = 3;
  const [list, setList] = useState([]);
  const [stories] = useStories(list, setList);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => res.json())
      .then((topStories) => {
        let stories = topStories
          .slice(0, numberOfTopStories)
          .map((story) => [story]);
        setList(stories);
      });
  }, []);

  return (
    <div>
      <h3>Suggested Stories</h3>
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
