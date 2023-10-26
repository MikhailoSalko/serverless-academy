import weatherInstance from "./api/instance.js";
import TelegramBot from "node-telegram-bot-api";

const ZAPORIZHIA = "Zaporizhia";

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const cityButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: ZAPORIZHIA, callback_data: ZAPORIZHIA }]],
  }),
};

const timeButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "every 3 hours", callback_data: "3" },
        { text: "every 6 hours", callback_data: "6" },
      ],
    ],
  }),
};

const weatherBot = () => {
  bot.setMyCommands([{ command: "/start", description: "Start the weather bot" }]);

  bot.on("message", (msg) => {
    const {
      chat: { id },
    } = msg;

    return bot.sendMessage(id, "Hello to weather bot. Choose the city below.", cityButton);
  });

  bot.on("callback_query", async (msg) => {
    const {
      message: {
        chat: { id },
      },
      data,
    } = msg;
    if (data === ZAPORIZHIA) {
      await bot.sendMessage(
        id,
        "Choose at what interval you want to receive the weather forecast for the city of Zaporizhia",
        timeButtons
      );
      return;
    }
    if (data === "3") {
      await bot.sendMessage(id, "You choose the interval in 3 hours");
      return;
    } else if (data === "6") {
      await bot.sendMessage(id, "You choose the interval in 6 hours");
      return;
    }
  });
};

const forecast = async () => {
  const { data } = await weatherInstance.get();
  // console.log(data);
  // return forecast;
};

// console.log(forecast());

// forecast();

weatherBot();
