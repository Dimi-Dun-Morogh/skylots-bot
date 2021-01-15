import { TelegrafContext } from 'telegraf/typings/context';
import { logger } from '../helpers/logger/logger';

const NAMESPACE = 'middlewares.bot.ts';

const isLink = () => (ctx: TelegrafContext, next: Function) => {
  if (!ctx || !ctx.message) return null;
  const { text } = ctx.message;
  // proverka na validnost linka
  if (text !== undefined && text.includes('https://skylots.org')) {
    return next();
  }
  logger.info(NAMESPACE, `invalid link, msg text = "${text}"`);
  return ctx.reply(
    'пожалуйста дайте мне валидную ссылку на аукцион, пример ссылки - https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4',
  );
};

export {
  isLink,
};
