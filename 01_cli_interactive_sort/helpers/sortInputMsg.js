const sortInputMsg = (msg) => {
  const words = [];
  const numbers = [];
  const array = msg.split(" ");
  array.forEach((el) => {
    !isNaN(Number(el)) ? numbers.push(el) : words.push(el);
  });

  return { words, numbers };
};

export default sortInputMsg;
