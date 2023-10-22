import inquirer from "inquirer";
import fs from "fs/promises";

const enterName = async () => {
  const msg = await inquirer.prompt([{ name: "Please, enter the name of the user" }]);
  console.log(msg);
};

enterName();
