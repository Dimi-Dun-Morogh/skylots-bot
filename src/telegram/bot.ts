import { Telegraf } from 'telegraf';
import { BOT } from '../config';
import { isLink } from '../middlewares/middleware.bot';
import { createAucTask } from './controllers/auc-task';

const bot = new Telegraf(BOT.token);
bot.use(isLink());

bot.on('message', (ctx) => {
  // console.log(ctx.message);
  createAucTask(ctx);
});

export {
  bot,
};
