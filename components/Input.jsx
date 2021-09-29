import React, { useState } from "react";
import styles from "../styles/Input.module.css";

function Input({ handleForm }) {
  const [ipt, setIpt] = useState("");

  const onFormSubmit = (e) => {
    handleForm(e, ipt);
    setIpt("");
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <input
        className={`${styles.input} ${styles.diamond3}}`}
        value={ipt}
        onChange={(e) => setIpt(e.target.value)}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}

export default Input;
