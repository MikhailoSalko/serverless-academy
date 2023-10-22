const questionsCreateUser = [
  {
    type: "input",
    name: "name",
    message: "Please, enter your name. To cancel press ENTER",
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

export default questionsCreateUser;
