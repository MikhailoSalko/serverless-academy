import readline from "readline";
import { chooseTheNumber, sortInputMsg } from "./helpers/index.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cliApp = () => {
  rl.question("Hello, please enter at least 10 words or digits separated by space: ", (msg) => {
    if (msg.toLowerCase().trim() === "exit") {
      console.log("Have a nice day. Good buy.");
      process.exit(0);
    }
    const { words, numbers } = sortInputMsg(msg);
    chooseTheNumber({ rl, cliApp, words, numbers });
  });
};

cliApp();
