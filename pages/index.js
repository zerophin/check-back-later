import Head from "next/head";
import styles from "../styles/Home.module.css";
import useCheckApi from "../hooks/useCheckAPI";
import SuggestedStories from "../components/SuggestedStories";
import MainSection from "../components/MainSection";
import { addOneToLocalStorage } from "../helpers";

export default function Home() {
  const isAvailable = useCheckApi();

  const addStoryFromSuggested = (id) => {
    addOneToLocalStorage(id);
    location.reload();
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
        <MainSection />
        <SuggestedStories handleAddStory={addStoryFromSuggested} />
      </main>
    </div>
  );
}
