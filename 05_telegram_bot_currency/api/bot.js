import TelegramBot from "node-telegram-bot-api";
import { USD, EUR } from "../constans.js";

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const bankButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "USD", callback_data: USD },
        { text: "EUR", callback_data: EUR },
      ],
    ],
  }),
};

const previousButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Return to select currencies", callback_data: "back" }]],
  }),
};

export default { bot, bankButton, previousButton };
