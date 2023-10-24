import { program } from "commander";

const invokeAction = async ({ action, message, photo, help }) => {
  switch (action) {
    case "message":
      return console.log("this is message");
    case "m":
      return console.log("this is message");
    case "photo":
      return console.log("this is photo");
    case "p":
      return console.log("this is photo");
    case "--help":
      return console.log("these are all commands");
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-m, --message <type>", "user message")
  .option("-p, --photo <type>", "path to photo")
  .option("-h, --help");

program.parse();

const consoleActions = program.opts();

invokeAction(consoleActions);
