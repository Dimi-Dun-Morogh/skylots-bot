import { TelegrafContext } from 'telegraf/typings/context';

const isLink = () => (ctx: TelegrafContext, next: Function) => {
  if (ctx === undefined || ctx === null || ctx.message === undefined) return null;
  const { text } = ctx.message;
  // proverka na validnost linka
  if (text !== undefined && text.includes('https://skylots.org')) {
    return next();
  }
  return ctx.reply(
    'пожалуйста дайте мне валидную ссылку на аукцион, пример ссылки - https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4',
  );
};

export {
  isLink,
};
