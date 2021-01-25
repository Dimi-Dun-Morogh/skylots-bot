"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const middleware_bot_1 = require("../middlewares/middleware.bot");
const auc_task_1 = require("./controllers/auc-task");
const chat_commands_1 = require("./controllers/chat-commands");
const bot = new telegraf_1.Telegraf(config_1.BOT.token);
exports.bot = bot;
bot.use(middleware_bot_1.isLink());
bot.command('/show_all', (ctx) => {
    auc_task_1.allAucTasks(ctx);
});
bot.command('/delete', (ctx) => {
    auc_task_1.deleteTask(ctx);
});
bot.command('/help', (ctx) => {
    chat_commands_1.handleHelp(ctx);
});
bot.on('message', (ctx) => {
    // console.log(ctx.message);
    auc_task_1.createAucTask(ctx);
});
