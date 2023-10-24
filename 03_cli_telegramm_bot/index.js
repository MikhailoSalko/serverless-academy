import { program } from "commander";
import TelegramBot from "node-telegram-bot-api";

const { TELEGRAM_TOKEN } = process.env;

// const token = "6817217923:AAH_ASwzmN4RLoz31kXWERpXK9hDwGgJUYc";
// console.log(process.env);

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

const invokeAction = async ({ action, message, photo, help }) => {
  // console.log(process.argv);
  if (message) {
    console.log("this is message: ", message);
  }

  // switch (action) {
  //   case "message":
  //     return console.log("this is message: ", message);
  //   case "m":
  //     return console.log("this is message");
  //   case "photo":
  //     return console.log("this is photo");
  //   case "p":
  //     return console.log("this is photo");
  //   case "--help":
  //     return console.log("these are all commands");
  //   default:
  //     console.warn("\x1B[31m Unknown action type!");
  // }
};

program
  // .option("-a, --action <type>", "choose action")
  .option("-m, --message <type>", "user message")
  .option("-p, --photo <type>", "path to photo")
  .option("-h, --help");

program.parse();

const consoleActions = program.opts();
// console.log(consoleActions);

// invokeAction(consoleActions);
