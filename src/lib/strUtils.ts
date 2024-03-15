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

export const toPascalCase = (str: string) => {
  const arr = str.split(" ");
  arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return arr.join("");
};

export const toCamelCase = (str: string) => {
  str = toPascalCase(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};
