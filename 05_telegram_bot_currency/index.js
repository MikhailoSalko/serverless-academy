import { telegramBot, getCurrencyExchange } from "./api/index.js";
import { markup } from "./helpers/index.js";
import { USD, EUR } from "./constans.js";

const telegramBotMain = () => {
  telegramBot.bot.setMyCommands([{ command: "/start", description: "Start the currency bot" }]);

  telegramBot.bot.on("message", (msg) => {
    const {
      text,
      chat: { id },
    } = msg;

    if (text === "/start") {
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

    if (data === "back") {
      return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);
    }

    if (data === USD) {
      const currency = await getCurrencyExchange();
      const dol = [currency[1], currency[2]];
      return telegramBot.bot.sendMessage(
        id,
        `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(dol)}`,
        telegramBot.previousButton
      );
    } else if (data === EUR) {
      const currency = await getCurrencyExchange();
      const eur = [currency[0], currency[3]];
      return telegramBot.bot.sendMessage(
        id,
        `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(eur)}`,
        telegramBot.previousButton
      );
    }
  });
};

telegramBotMain();
