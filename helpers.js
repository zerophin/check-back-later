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

// resist over-engineering.  may this forever remain commented

// export const checkLocalStorage = (term, col = 0) => {
//   const ls = getLocalStorage("posts");
//   return ls.findIndex((el) => el[0] === term);
// };
//
// export const updtateTerm = (term, updateComments) => {
//   const foundTerm = checkLocalStorage(term);
//   getLocalStorage()
// };
