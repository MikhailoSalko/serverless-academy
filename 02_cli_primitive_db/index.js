import inquirer from "inquirer";
import fs from "fs/promises";

const question = [
  {
    type: "input",
    name: "name",
    message: "Please, enter your name",
  },
  {
    type: "list",
    name: "gender",
    message: "Please, choose your gender",
    choices: ["male", "female"],
  },
  {
    type: "input",
    name: "age",
    message: "Please, enter your age",
  },
];

const enterName = async () => {
  const msg = await inquirer.prompt(question);
  console.log(msg);
};

enterName();
