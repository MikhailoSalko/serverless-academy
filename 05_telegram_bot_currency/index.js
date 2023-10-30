import { telegramBot, getCurrencyExchange } from "./api/index.js";
import NodeCache from "node-cache";
import { markup } from "./helpers/index.js";
import { USD, EUR } from "./constans.js";

const myCache = new NodeCache();

let currency = [];

const telegramBotMain = () => {
  telegramBot.bot.setMyCommands([{ command: "/start", description: "Start the currency bot" }]);

  telegramBot.bot.on("message", async (msg) => {
    const {
      text,
      chat: { id },
    } = msg;

    if (text === "/start") {
      const currencyCache = myCache.get("currency");
      if (!currencyCache) {
        currency = await getCurrencyExchange();
        myCache.set("currency", currency, 60);
      }
      return telegramBot.bot.sendMessage(
        id,
        "Welcome to the currency bot. Please, choose the currency whose exchange rate you want to receive.",
        telegramBot.bankButton
      );
    }
    return telegramBot.bot.sendMessage(id, "I don't understand your command");
  });

  telegramBot.bot.on("callback_query", async (msg) => {
    let cache;
    const {
      message: {
        chat: { id },
      },
      data,
    } = msg;

    switch (data) {
      case "back":
        return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);

      case USD:
        cache = myCache.get("currency");
        if (!cache) {
          currency = await getCurrencyExchange();
          myCache.set("currency", currency, 60);
          const { dollar } = myCache.get("currency");
          return telegramBot.bot.sendMessage(
            id,
            `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(
              dollar
            )}`,
            telegramBot.previousButton
          );
        }
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(
            cache.dollar
          )}`,
          telegramBot.previousButton
        );

      case EUR:
        cache = myCache.get("currency");
        if (!cache) {
          currency = await getCurrencyExchange();
          myCache.set("currency", currency, 60);
          const { euro } = myCache.get("currency");
          return telegramBot.bot.sendMessage(
            id,
            `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(
              euro
            )}`,
            telegramBot.previousButton
          );
        }
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(
            cache.euro
          )}`,
          telegramBot.previousButton
        );

      default:
        return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);
    }
  });
};

telegramBotMain();
