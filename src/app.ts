import { parseDate } from './helpers/parser/skylots';
import { bot } from './telegram/bot';

bot.launch().then(() => console.log('bot up and running'));

console.log(parseDate('20 дек 2020 21:00:00'));
