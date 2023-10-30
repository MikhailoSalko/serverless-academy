import { telegramBot, getCurrencyExchange } from "./api/index.js";
import NodeCache from "node-cache";
import { markup } from "./helpers/index.js";
import { USD, EUR } from "./constans.js";

const myCache = new NodeCache();

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
    let currency = [];
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
        const valueDollar = myCache.get("dol");
        console.log(valueDollar);
        if (valueDollar === undefined) {
          currency = await getCurrencyExchange();
          const dol = [currency[1], currency[2]];
          const dollar = myCache.set("dol", dol, 60);
          const dolCache = myCache.get("dol");
          return telegramBot.bot.sendMessage(
            id,
            `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(
              dolCache
            )}`,
            telegramBot.previousButton
          );
        }
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current dollar exchange rate of a privat bank and a monobank: ${markup(
            valueDollar
          )}`,
          telegramBot.previousButton
        );

      case EUR:
        const valueEuro = myCache.get("eur");
        if (valueEuro === undefined) {
          currency = await getCurrencyExchange();
          const eur = [currency[0], currency[3]];
          const euro = myCache.set("eur", eur, 60);
          const eurCache = myCache.get("eur");
          return telegramBot.bot.sendMessage(
            id,
            `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(
              eurCache
            )}`,
            telegramBot.previousButton
          );
        }
        return telegramBot.bot.sendMessage(
          id,
          `Here is the current euro exchange rate of a privat bank and a monobank: ${markup(
            valueEuro
          )}`,
          telegramBot.previousButton
        );

      default:
        return telegramBot.bot.sendMessage(id, "Choose a currency.", telegramBot.bankButton);
    }
  });
};

telegramBotMain();
