export const getWebsiteAndData = (website) => {
  const websiteReg = /\w+\.com/;
  const siteData = website.match(websiteReg);
  if (!Array.isArray(siteData)) return false;
  switch (siteData[0]) {
    case "ycombinator.com":
      // Grabs hackernews id query
      let id = siteData.input.match(/id=\d+/)[0].slice(3);
      return id;
    // When supporting multiple websites
    // grab the id and specific website
    //return { site: siteData[0], id: id };
    case "reddit.com": // add reddit here
    default:
      return false;
  }
};
