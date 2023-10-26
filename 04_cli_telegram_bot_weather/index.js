import { telegramBot, forecast } from "./api/index.js";
import { markup } from "./helpers/index.js";
const { ZAPORIZHIA } = process.env;

const weatherBot = () => {
  telegramBot.bot.setMyCommands([{ command: "/start", description: "Start the weather bot" }]);

  telegramBot.bot.on("message", (msg) => {
    const {
      text,
      chat: { id },
    } = msg;

    if (text === "/start") {
      return telegramBot.bot.sendMessage(
        id,
        "Hello to weather bot. Choose the city below.",
        telegramBot.cityButton
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

    if (data === ZAPORIZHIA) {
      await telegramBot.bot.sendMessage(
        id,
        "Choose at what interval you want to receive the weather forecast for the city of Zaporizhia",
        telegramBot.timeButtons
      );
      return;
    }

    if (data === "3") {
      const { list } = await forecast(data);
      return telegramBot.bot.sendMessage(
        id,
        `Here is the 3 hours interval weather forecast in Zaporizhia: 
        ${markup(list)}
        Would you like to choose another interval?`,
        telegramBot.timeButtons
      );
    } else if (data === "6") {
      const list = await forecast(data);
      return telegramBot.bot.sendMessage(
        id,
        `Here is the 6 hours interval weather forecast in Zaporizhia:
        ${markup(list)}
        Would you like to choose another interval?`,
        telegramBot.timeButtons
      );
    }
  });
};

weatherBot();
