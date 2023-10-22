import inquirer from "inquirer";
import fs from "fs/promises";
import readline from "readline";
import questionsCreateUser from "./questionsCreateUser.js";
import questionsFindUser from "./questionsFindUser.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

const enterName = () => {
  let msg = "";

  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please, enter your name. To cancel press ENTER",
      },
    ])
    .then((ans) => {
      process.stdin.on("keypress", async (_, key) => {
        if (key.name === "return") {
          inquirer
            .prompt([
              {
                type: "confirm",
                name: "toSearchUser",
                message: "Would you like to find user fy name?",
                default: false,
                transformer: (answer) => (answer ? "yes" : "no"),
              },
            ])
            .then((ans) => {
              console.log(ans);
            });
        }
      });
    });
};

enterName();
