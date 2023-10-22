const questionsFindUser = [
  {
    type: "confirm",
    name: "toSearchUser",
    message: "Would you like to find user fy name?",
    default: false,
    transformer: (answer) => (answer ? "yes" : "no"),
  },
];

export default questionsFindUser;
