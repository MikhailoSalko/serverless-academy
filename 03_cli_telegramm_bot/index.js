import { program } from "commander";
import TelegramBot from "node-telegram-bot-api";

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const getId = async () => {
  const [
    {
      message: {
        chat: { id },
      },
    },
  ] = await bot.getUpdates();

  return id;
};

const invokeAction = async ({ message, photo }) => {
  if (message) {
    const id = await getId();
    await bot.sendMessage(id, message);
    process.exit(0);
  }
  if (photo) {
    const id = await getId();
    await bot.sendPhoto(id, photo);
    console.log("You sent a photo to your bot");
    process.exit(0);
  }
  if (!message || !photo) {
    console.log("Unknow action, try `node index.js -h` to see the help menu");
    process.exit(0);
  }
};

program
  .name("cli_telegram_bot_display")
  .description("CLI app for telegram bot to display messages and photos")
  .option("-m, --message <type>", "user message")
  .option("-p, --photo <type>", "path to photo");

program.parse();

const consoleActions = program.opts();

invokeAction(consoleActions);
