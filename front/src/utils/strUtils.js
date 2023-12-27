const transformSpecialChars = (str) => {
  return str.replace(/[^\w]/gi, "-");
};

const replaceAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function stringToUrl(str) {
  return transformSpecialChars(replaceAccents(str.toLowerCase()));
}

export { stringToUrl };
