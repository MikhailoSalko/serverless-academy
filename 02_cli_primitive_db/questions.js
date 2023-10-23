const questionsCreateUser = [
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
    name: "getSearch",
    message: "Would you like to find user fy name?",
    when: (answers) => answers.name === "",
    transformer: (answer) => (answer ? "yes" : "no"),
  },
];

const questionsFindUser = [
  {
    type: "input",
    name: "name",
    message: "Enter user's name you want to find in DB: ",
  },
];

export default { questionsCreateUser, questionsFindUser };
