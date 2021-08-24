export const getWebsiteAndData = (website) => {
  const websiteReg = /\w+\.com/;
  const siteData = website.match(websiteReg);
  if (!Array.isArray(siteData)) return false;
  switch (siteData[0]) {
    case "ycombinator.com":
      // Grabs hackernews id query
      let id = siteData.input.match(/id=\d+/)[0].slice(3);
      return +id;
    // When supporting multiple websites
    // grab the id and specific website
    //return { site: siteData[0], id: id };
    case "reddit.com": // add reddit here
    default:
      return false;
  }
};

export const getLocalStorage = (searchTerm) => {
  const ls = localStorage.getItem(searchTerm);
  if (ls) {
    return JSON.parse(ls);
  }
  return false;
};

export const loadLocalStorage = () => {
  const prevList = localStorage.getItem("posts");
  if (prevList) {
    const parsedList = JSON.parse(prevList);
    return parsedList;
  }
};

export const saveLocalStorage = (stories) => {
  const posts = localStorage.getItem("posts");
  if (posts) {
    const parsedPosts = JSON.parse(posts);
    const mPosts = new Map(parsedPosts);

    const newStories = stories.map((story) => {
      const storyID = story.id;
      const alreadyHasStory = mPosts.has(storyID);
      if (alreadyHasStory) {
        return [storyID, mPosts.get(storyID)];
      } else {
        return [storyID, story.descendants];
      }
    });
    if (newStories.length) {
      console.log("updating from", posts);
      console.log("to", newStories);
      localStorage.setItem("posts", JSON.stringify(newStories));
    }
  } else {
    const postsWithComment = stories.map((item) => {
      return [item.id, item.descendants];
    });
    localStorage.setItem("posts", JSON.stringify(postsWithComment));
  }
};
