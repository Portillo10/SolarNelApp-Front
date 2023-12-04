export const toUpper = (word = "") => {
  const words = word.split(" ");
  let finalWord = "";
  words.forEach((w) => {
    finalWord += `${w.charAt(0).toUpperCase()}${w.slice(1)}${words.length>1?" ":""}`;
  });
  return finalWord;
};