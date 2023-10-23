const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name? (Press ENTER to skip): ",
  },
  {
    type: "list",
    name: "gender",
    message: "Please, choose your gender: ",
    choices: ["male", "female"],
    when: (answers) => answers.name !== "",
  },
  {
    type: "input",
    name: "age",
    message: "Please, enter your age: ",
    when: (answers) => answers.name !== "",
  },
  {
    type: "confirm",
    name: "searchUserName",
    message: "Would you like to find user fy name?",
    when: (answers) => answers.name === "",
    transformer: (answer) => (answer ? "yes" : "no"),
  },
];

export default questions;
