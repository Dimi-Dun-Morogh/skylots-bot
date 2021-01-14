import { Telegraf } from 'telegraf';
import { BOT } from '../config';
import { isLink } from '../middlewares/middleware.bot';

const bot = new Telegraf(BOT.token);
console.log(BOT.token);
bot.use(isLink());

bot.on('message', (ctx) => {
  console.log(ctx.message);
});

export {
  bot,
};
