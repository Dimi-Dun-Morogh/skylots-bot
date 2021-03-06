import { Telegraf } from 'telegraf';
import { BOT } from '../config';
import { isLink } from '../middlewares/middleware.bot';
import { createAucTask, allAucTasks, deleteTask } from './controllers/auc-task';
import { handleHelp } from './controllers/chat-commands';

const bot = new Telegraf(BOT.token);
bot.use(isLink());

bot.command('/show_all', (ctx) => {
  allAucTasks(ctx);
});

bot.command('/delete', (ctx) => {
  deleteTask(ctx);
});

bot.command('/help', (ctx) => {
  handleHelp(ctx);
});

bot.on('message', (ctx) => {
  // console.log(ctx.message);
  createAucTask(ctx);
});

export { bot };
