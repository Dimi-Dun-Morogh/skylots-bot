import { TelegrafContext } from 'telegraf/typings/context';
import { logger } from '../helpers/logger/logger';
import { ICommands } from '../interfaces/tg';

const NAMESPACE = 'middlewares.bot.ts';

const allowedCommands = (command: string) :boolean | undefined => {
  const commands :ICommands = {
    '/show_all': true,
    '/delete': true,
    '/help': true,
  };
  return commands[command];
};

const isLink = () => (ctx: TelegrafContext, next: Function) => {
  if (!ctx || !ctx.message || !ctx.message.text) return null;
  const { text } = ctx.message;
  const [command] = text.split(' ');
  // proverka na validnost linka
  if (text.includes('https://skylots.org') || allowedCommands(command)) {
    return next();
  }
  logger.info(NAMESPACE, `invalid link, msg text = "${text}"`);
  ctx.reply(
    'пожалуйста дайте мне валидную ссылку на аукцион, пример ссылки - https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4',
  ).catch((error) => {
    logger.info(NAMESPACE, error.message, error);
    return Promise.reject(error);
  });
};

export {
  isLink,
};
