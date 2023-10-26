import TelegramBot from "node-telegram-bot-api";

const { TELEGRAM_TOKEN, ZAPORIZHIA } = process.env;

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
        { text: "at intervals of 3 hours", callback_data: "3" },
        { text: "at intervals of 6 hours", callback_data: "6" },
      ],
    ],
  }),
};

export default { bot, cityButton, timeButtons };
