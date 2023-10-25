import { program } from "commander";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const getUpdates = async () => {
  const [
    {
      message: {
        chat: { id },
      },
    },
  ] = await bot.getUpdates();

  return id;
};

const invokeAction = async ({ message, photo, help }) => {
  if (message) {
    const id = await getUpdates();
    await bot.sendMessage(id, message);
    process.exit(0);
  }
  if (photo) {
    const id = await getUpdates();
    await bot.sendPhoto(id, photo);
    console.log("You sent a photo to your bot");
    process.exit(0);
  }
  if (help) {
    program
      .name("cli_telegram_bot")
      .description("CLI app for telegram bot to display messages and photos")
      .option("--first", "display just the first substring")
      .option("-s, --separator <char>", "separator character", ",");

    // program
    //   .command("split")
    // .description("Split a string into substrings and display as an array")

    // .action((str, options) => {
    //   const limit = options.first ? 1 : undefined;
    //   console.log(str.split(options.separator, limit));
    // });

    program.parse();
    process.exit(0);
  }
  if (!message && !photo && !help) {
    console.warn("\x1B[31m Unknown action type!");
    process.exit(1);
  }
};

program
  .option("-m, --message <type>", "user message")
  .option("-p, --photo <type>", "path to photo")
  .option("-h, --help", "display commands");

program.parse();

const consoleActions = program.opts();

invokeAction(consoleActions);
