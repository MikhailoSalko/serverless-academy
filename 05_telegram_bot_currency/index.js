import { telegramBot } from "./api/index.js";
import NodeCache from "node-cache";
import { markup, getCache } from "./helpers/index.js";
import { BACK, USD, EUR } from "./constans.js";

const myCache = new NodeCache();

const telegramBotMain = () => {
  telegramBot.bot.setMyCommands([{ command: "/start", description: "Start the currency bot" }]);

  telegramBot.bot.on("message", async (msg) => {
    const {
      text,
      chat: { id },
    } = msg;

    if (text === "/start") {
      await getCache(myCache);
      return telegramBot.bot.sendMessage(
        id,
        "Welcome to the currency bot. Please, choose the currency whose exchange rate you want to receive.",
        telegramBot.bankButton
      );
    }
    return telegramBot.bot.sendMessage(id, "I don't understand your command");
  });

  telegramBot.bot.on("callback_query", async (msg) => {
    const {
      message: {
        chat: { id },
      },
      data,
    } = msg;

    switch (data) {
      case BACK:
        return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);

      case USD:
        const { dollar } = await getCache(myCache);
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(
            dollar
          )}`,
          telegramBot.previousButton
        );

      case EUR:
        const { euro } = await getCache(myCache);
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(euro)}`,
          telegramBot.previousButton
        );

      default:
        return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);
    }
  });
};

telegramBotMain();
