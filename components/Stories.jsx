import styles from "../styles/Home.module.css";
import Story from "./Story";
import { useState } from "react";

function Stories({
  stories,
  handleButtonClick,
  list,
  updateStoryComments,
  buttonText = "delete",
}) {
  const [sorted, setSorted] = useState(false);

  const isValidStory = (story) => story && story.type === "story";
  const sortByCommentCount = (a, b) => {
    const aNewComments = a.props.post.descendants - a.props.previousCount;
    const bNewComments = b.props.post.descendants - b.props.previousCount;
    return aNewComments - bNewComments;
  };

  const storyList = stories.filter(isValidStory).map((story, i) => {
    let previousCount = list[i] && list[i][1];
    return (
      <Story
        key={story.id}
        post={story}
        handleClick={updateStoryComments}
        handleButtonClick={handleButtonClick}
        previousCount={previousCount}
        buttonText={buttonText}
      />
    );
  });

  return (
    <>
      {updateStoryComments && (
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? `Sort by added` : `Sort by new comments`}
        </button>
      )}
      <ol className={styles.list}>
        {sorted ? storyList.sort(sortByCommentCount) : storyList}
      </ol>
    </>
  );
}

export default Stories;
