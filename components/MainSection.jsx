import useStories from "../hooks/useStories";
import { default as seed } from "../seed";
import {
  getWebsiteAndData,
  loadLocalStorage,
  saveLocalStorage,
} from "../helpers";
import Input from "./Input";
import LoadingAnimation from "./LoadingAnimation";
import Stories from "./Stories";
import { useEffect, useState } from "react";

function MainSection(props) {
  //[[id, commentCount]]
  const [list, setList] = useState([]);
  //[{}]
  const [stories, setStories] = useStories(list, setList);

  // check if first time visiting page
  useEffect(() => {
    const previousVisit = localStorage.getItem("posts");
    if (previousVisit === null) {
      const seed = require("../seed").default;
      // setting read comments to 0
      const seedMap = seed.map((id) => [id, 0]);
      setList(seedMap);
    }
  }, []);
  // Load from local storage
  useEffect(() => {
    let ls = loadLocalStorage();
    if (ls) {
      setList(ls);
    }
  }, []);

  // save to local storage
  useEffect(() => {
    saveLocalStorage(list);
  }, [list]);

  // Update the new story to reflect the number of comments when added
  useEffect(() => {
    if (stories.length > 0) {
      let mapList = new Map(list);
      mapList.forEach((item, key) => {
        if (item === undefined) {
          const storyChildren = stories.find((story) => story.id === key);
          mapList.set(key, storyChildren.descendants);
        }
      });
      localStorage.setItem("posts", JSON.stringify(Array.from(mapList)));
    }
    // leave the dependency like this
  }, [stories]);

  function updateStoryComments(id) {
    const storyViewCount = stories.find((story) => story.id === id).descendants;
    const listMap = new Map(list);
    listMap.set(id, storyViewCount);

    const arrayList = Array.from(listMap);
    localStorage.setItem("posts", JSON.stringify(arrayList));
    setList(arrayList);
  }

  const handleForm = (e, ipt) => {
    e.preventDefault();
    let webData = getWebsiteAndData(ipt);
    if (!webData) {
      alert("Invalid website or link... only hackernews links");
    } else if (!list.every((story) => story[0] !== webData)) {
      alert("That website is already added!");
    } else {
      setList([...list, [webData]]);
    }
  };

  const deleteStory = (id) => {
    const newList = list.filter((story) => story[0] !== id);
    const newStory = stories.filter((story) => story.id !== id);
    setList(newList);
    setStories(newStory);
  };
  return (
    <>
      <Input handleForm={handleForm} />
      {list.length > 0 && !stories.length > 0 ? (
        <LoadingAnimation />
      ) : (
        <Stories
          stories={stories}
          list={list}
          handleButtonClick={deleteStory}
          updateStoryComments={updateStoryComments}
        />
      )}
      {!list.length && <p>No posts added!</p>}
    </>
  );
}

export default MainSection;
