import inquirer from "inquirer";
import fs from "fs/promises";
import questions from "./questions.js";

const enterName = async () => {
  let msg = {};
  msg = await inquirer.prompt(questions);
  if (msg.name === "") {
    console.log("You skipped entering your name.");
  } else if (msg.name !== "") {
    console.log(`Your name ${msg.name}`);
  }
  // console.log(msg);
};

enterName();
