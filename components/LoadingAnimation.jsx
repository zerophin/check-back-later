import React from "react";
import styles from "../styles/LoadingAnimation.module.css";

function LoadingAnimation({ text }) {
  return (
    <div className={styles.container}>
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <p>{text}...</p>}
    </div>
  );
}

export default LoadingAnimation;
