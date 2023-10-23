import inquirer from "inquirer";
import questions from "./questions.js";
import { usersFunc } from "./users/index.js";

const enterName = async () => {
  let msg = {};
  msg = await inquirer.prompt(questions.questionsCreateUser);
  if (msg.name === "") {
    if (msg.getSearch === "no") {
      console.log("Good buy. Come again.");
      process.exit(0);
    }
    const users = await usersFunc.listOfUsers();
    console.log(users);
    msg = await inquirer.prompt(questions.questionsFindUser);
    const foundedUser = await usersFunc.getUserByName(msg.name);
    !foundedUser
      ? console.log("We didn't find such user, please, try again")
      : console.log(`We found user ${msg.name}:\n`, foundedUser);
  } else if (msg.name !== "") {
    await usersFunc.addUser(msg);
    enterName();
  }
};

enterName();
