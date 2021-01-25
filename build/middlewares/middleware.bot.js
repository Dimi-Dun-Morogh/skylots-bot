"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLink = void 0;
const logger_1 = require("../helpers/logger/logger");
const NAMESPACE = 'middlewares.bot.ts';
const allowedCommands = (command) => {
    const commands = {
        '/show_all': true,
        '/delete': true,
        '/help': true,
    };
    return commands[command];
};
const isLink = () => (ctx, next) => {
    if (!ctx || !ctx.message || !ctx.message.text)
        return null;
    const { text } = ctx.message;
    const [command] = text.split(' ');
    // proverka na validnost linka
    if (text.includes('https://skylots.org') || allowedCommands(command)) {
        return next();
    }
    logger_1.logger.info(NAMESPACE, `invalid link, msg text = "${text}"`);
    ctx.reply('пожалуйста дайте мне валидную ссылку на аукцион, пример ссылки - https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4').catch((error) => {
        logger_1.logger.info(NAMESPACE, error.message, error);
        return Promise.reject(error);
    });
};
exports.isLink = isLink;
