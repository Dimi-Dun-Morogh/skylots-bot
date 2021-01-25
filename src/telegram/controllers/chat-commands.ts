import { TelegrafContext } from 'telegraf/typings/context';

const { textToEmoji } = require('../../helpers/dictionary');

const handleHelp = (ctx: TelegrafContext): void => {
  const pin = textToEmoji('pin');
  const lightning = textToEmoji('lightning');
  const helpString = `${lightning}skylotsHelper${lightning} - бот который позволяет создать напомание об аукционе. \nЧтобы создать напоминание, просто перешлите мне ссылку на аукцион. Ссылка вида - https://skylots.org/6584458028/Novye+slipony+na+ovechey+shersti+s+mehom+krolika+ot+1grn\n\n ${pin}Список доступных комманд${pin}:\n\n /show_all - показать все аукционы\n /delete id - удалить напоминание, пример комманды - /delete 6009d9ca5f1a5755dcda9ad1`;
  ctx.reply(helpString);
};

export { handleHelp };
