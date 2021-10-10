export const getWebsiteAndData = (website) => {
  const websiteReg = /\w+\.com/;
  const siteData = website.match(websiteReg);
  if (!Array.isArray(siteData)) return false;
  switch (siteData[0]) {
    case "ycombinator.com":
      // Grabs hackernews id query
      let match = siteData.input.match(/id=\d+/);
      if (match) {
        console.log({ match });
        let id = match[0].slice(3);
        return +id;
      }
      // hacker news link without id
      return false;

    // When supporting multiple websites
    // grab the id and specific website
    //return { site: siteData[0], id: id };
    case "reddit.com": // add reddit here
      alert("Reddit is not yet supported");
    default:
      return false;
  }
};

export const loadLocalStorage = () => {
  const prevList = localStorage.getItem("posts");

  if (prevList) {
    const parsedList = JSON.parse(prevList);
    return parsedList;
  }
};
// todo rename
export const saveLocalStorage = (list) => {
  const posts = localStorage.getItem("posts");
  if (posts) {
    const parsedPosts = JSON.parse(posts);
    const mPosts = new Map(parsedPosts);

    const newIdList = list.map((item) => {
      const itemID = item[0];
      const alreadyHasStory = mPosts.has(itemID);
      if (alreadyHasStory) {
        return [itemID, mPosts.get(itemID)];
      } else {
        return [itemID, null];
      }
    });
    // Dear Randal, you might want to add a .length check here
    // But this has led to hours of debugging, learn from your past mistakes don't repeat them
    if (newIdList) {
      console.log("updating from", parsedPosts);
      console.log("to", newIdList);
      localStorage.setItem("posts", JSON.stringify(newIdList));
    } // ---adding~~~space---for~~~readability---thanks~~~prettier---
  } else {
    const postsWithComment = list.map((item) => {
      return [item[0], item[1]];
    });
    localStorage.setItem("posts", JSON.stringify(postsWithComment));
  }
};
