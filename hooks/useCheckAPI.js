import React, { useEffect, useState } from "react";
import getStory from "./getStory";

function UseCheckApi() {
  const [isWorking, setIsWorking] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const checkResult = await getStory(`1`);
        const API_is_working =
          checkResult && checkResult.type && checkResult.type === "story";
        setIsWorking(API_is_working);
      } catch (e) {
        setIsWorking(false);
      }
    }
    fetchData();
  }, [isWorking]);
  return isWorking;
}

export default UseCheckApi;
