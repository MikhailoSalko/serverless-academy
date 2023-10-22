import inquirer from "inquirer";
import fs from "fs/promises";
import readline from "readline";
import questionsCreateUser from "./questionsCreateUser.js";
import questionsFindUser from "./questionsFindUser.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

const enterName = async () => {
  let msg = "";
  process.stdin.on("keypress", (str, key) => {
    if (key.name === "return") {
      console.log(str);
    }
  });
  msg = await inquirer.prompt(questionsCreateUser);

  // msg = await inquirer.prompt(questionsFindUser);
  enterName();
};

enterName();
