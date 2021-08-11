import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Story from "../components/Story";
import { getWebsiteAndData } from "../helpers";
import useStories from "../hooks/useStories";

export default function Home() {
  const [ipt, setIpt] = useState("");
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
    const prevList = localStorage.getItem("posts");
    if (prevList) {
      const parsedList = JSON.parse(prevList);
      setList(parsedList);
      // Stories are stored in local storage split by |
      // then grab the id and parse to number
      // const newList = prevList
      //   .split("|")
      //   .map((story) => story.split(",").map((el) => +el));
      // //.map((el) => +el[0]);
      // console.log("loading from local");
      // setList(newList);
    }
  }, []);

  // save to local storage
  useEffect(() => {
    const posts = localStorage.getItem("posts");
    if (posts) {
      const parsedPosts = JSON.parse(posts);
      const mPosts = new Map(parsedPosts);
      stories.forEach((story) => {
        let alreadyHasPosts = mPosts.get(story.id);
        if (!alreadyHasPosts) {
          mPosts.set(story.id, story.descendants);
        }
      });
      localStorage.setItem("posts", JSON.stringify(Array.from(mPosts)));
    }

    // const postsWithComment = stories.map((item) => {
    //   return [item.id, item.descendants];
    // });
    //
    // localStorage.setItem("posts", JSON.stringify(postsWithComment));
  }, [stories]);

  const handleForm = (e) => {
    e.preventDefault();
    let webData = getWebsiteAndData(ipt);
    if (webData && list.every((story) => story[0] !== webData)) {
      setList([...list, [webData]]);
      setIpt("");
    } else {
      console.error("errorerrrororeoreos");
    }
  };

  const deleteStory = (id) => {
    const newList = list.filter((story) => story[0] !== id);
    setList(newList);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Check Back Later</h1>
        <form onSubmit={handleForm}>
          <input value={ipt} onChange={(e) => setIpt(e.target.value)} />
          <button>Add</button>
        </form>
        {stories.map((story, i) => (
          <Story
            key={story.url + Math.random()}
            post={story}
            handleDelete={deleteStory}
            previousCount={list[i] && list[i][1]}
          />
        ))}
      </main>
    </div>
  );
}
