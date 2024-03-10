export const transformSpecialChars = (str: string) => {
  return str.replace(/[^\w]/gi, "-");
};

export const replaceAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const stringToUrl = (str: string) => {
  return transformSpecialChars(replaceAccents(str.toLowerCase()));
};

export const newlineToBreakTag = (str: string) => {
  return str.split("\n").join("<br />");
};
