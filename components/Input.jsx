import React, { useState } from "react";

function Input({ handleForm }) {
  const [ipt, setIpt] = useState("");

  const onFormSubmit = (e) => {
    handleForm(e, ipt);
    setIpt("");
  };

  return (
    <form style={{ width: "60%" }} onSubmit={onFormSubmit}>
      <input
        style={{ width: "70%", padding: "2rem" }}
        value={ipt}
        onChange={(e) => setIpt(e.target.value)}
      />
      <button style={{ height: "100%", width: "30%" }}>Add</button>
    </form>
  );
}

export default Input;
