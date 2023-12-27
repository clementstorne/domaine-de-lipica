const transformSpecialChars = (str) => {
  return str.replace(/[^\w]/gi, "-");
};

const replaceAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const stringToUrl = (str) => {
  return transformSpecialChars(replaceAccents(str.toLowerCase()));
};

const newlineToBreakTag = (str) => {
  return str.split("\n").join("<br />");
};

export { stringToUrl, newlineToBreakTag };
