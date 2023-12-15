export const toUpper = (word = "") => {
  const words = word.split(" ");
  let finalWord = "";
  words.forEach((w) => {
    finalWord += `${w.charAt(0).toUpperCase()}${w.slice(1)}${words.length>1?" ":""}`;
  });
  return finalWord;
};

export const toShortQuantity = (quantity) => {
  let finalQuantity = (quantity / 1000).toString().split(".")
  return (finalQuantity[0]) + "k"
}

export const cashFormat = (price) =>  {
  try {
    const number = ""
  } catch (error) {
    
  }
  return price.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).slice(0, -2)
}
