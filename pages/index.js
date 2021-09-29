import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Story from "../components/Story";
import {
  getWebsiteAndData,
  loadLocalStorage,
  saveLocalStorage,
} from "../helpers";
import useStories from "../hooks/useStories";
import Input from "../components/Input";

export default function Home() {
  //const [ipt, setIpt] = useState("");
  //[[id, commentCount]]
  const [list, setList] = useState([]);
  //[id]
  const [idList, setIDList] = useState([]);
  //[{}]
  const [stories] = useStories(idList);

  useEffect(() => {
    const newIDList = list.map((story) => +story[0]);
    setIDList(newIDList);
  }, [list]);

  // Load from local storage
  useEffect(() => {
    let ls = loadLocalStorage();
    if (ls) {
      setList(ls);
    }
  }, []);

  // save to local storage
  useEffect(() => {
    saveLocalStorage(stories);
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
    if (webData && list.every((story) => story[0] !== webData)) {
      setList([...list, [webData]]);
    } else {
      alert("That website is already added!");
    }
  };

  const deleteStory = (id) => {
    const newList = list.filter((story) => story[0] !== id);
    setList(newList);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Check Back Later</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Check Back Later</h1>

        <Input handleForm={handleForm} />
        <ol className={styles.list}>
          {stories.map((story, i) => (
            <Story
              key={story.url + Math.random()}
              post={story}
              handleDelete={deleteStory}
              previousCount={list[i] && list[i][1]}
              handleClick={updateStoryComments}
            />
          ))}
        </ol>
      </main>
    </div>
  );
}
