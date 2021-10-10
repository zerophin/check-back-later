import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Story from "../components/Story";
import {
  getWebsiteAndData,
  loadLocalStorage,
  saveLocalStorage,
} from "../helpers";
import useCheckApi from "../hooks/useCheckAPI";
import useStories from "../hooks/useStories";
import Input from "../components/Input";

export default function Home() {
  //[[id, commentCount]]
  const [list, setList] = useState([]);
  //[{}]
  const [stories] = useStories(list, setList);

  const isAvailable = useCheckApi();

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
    setList(newList);
  };

  if (!isAvailable) {
    return (
      <div className={styles.container}>
        <h1>API DOWN</h1>
        <p>
          For some reason this website is unable to connect to the Hacker News
          API, it might be down.
        </p>
        <button onClick={() => location.reload()}>refresh</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Check Back Later</title>
        <meta name="description" content="Follow hacker news stories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Check Back Later</h1>

        <Input handleForm={handleForm} />
        <ol className={styles.list}>
          {stories
            .filter((story) => story && story.type === "story")
            .map((story, i) => (
              <Story
                key={story.url + Math.random()}
                post={story}
                handleDelete={deleteStory}
                previousCount={list[i] && list[i][1]}
                handleClick={updateStoryComments}
              />
            ))}
        </ol>
        {!list.length && <p>No posts added!</p>}
      </main>
    </div>
  );
}
