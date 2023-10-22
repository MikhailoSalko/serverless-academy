const chooseTheNumber = ({ rl, cliApp, words, numbers }) => {
  rl.question(
    "How would you like to sort the input: \n 1. Sort words alphabetically(A - Z)\n 2. Show numbers from lesser to greater\n 3. Show numbers from bigger to smaller\n 4. Display words in ascending order by number of letters in the word\n 5. Show only unique words\n 6. Display only unique values from the set of words and numbers entered by the user.\n Select 1-6 and press ENTER: ",
    (msg) => {
      switch (msg) {
        case "1":
          console.log(words.sort((a, b) => a.localeCompare(b)));
          cliApp();
          break;
        case "2":
          console.log(numbers.sort((a, b) => a - b));
          cliApp();
          break;
        case "3":
          console.log(numbers.sort((a, b) => b - a));
          cliApp();
          break;
        case "4":
          console.log(words.sort((a, b) => a.length - b.length));
          cliApp();
          break;
        case "5":
          console.log(words.filter((el, index, array) => array.indexOf(el) === index));
          cliApp();
          break;
        case "6":
          const result = [...words, ...numbers];
          console.log(result.filter((el, index, array) => array.indexOf(el) === index));
          cliApp();
          break;
        default:
          console.log("\nYou need to choose only 1-6. Please, try again: \n");
          chooseTheNumber({ rl, cliApp, words, numbers });
          break;
      }
    }
  );
};

export default chooseTheNumber;
