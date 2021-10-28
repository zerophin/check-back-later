import styles from "../styles/Home.module.css";
import Story from "./Story";

function Stories({
  stories,
  handleButtonClick,
  list,
  updateStoryComments,
  buttonText = "delete",
}) {
  const isValidStory = (story) => story && story.type === "story";
  return (
    <ol className={styles.list}>
      {stories.filter(isValidStory).map((story, i) => (
        <Story
          key={story.id}
          post={story}
          handleButtonClick={handleButtonClick}
          previousCount={list[i] && list[i][1]}
          handleClick={updateStoryComments}
          buttonText={buttonText}
        />
      ))}
    </ol>
  );
}

export default Stories;
