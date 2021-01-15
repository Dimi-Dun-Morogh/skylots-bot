import { TelegrafContext } from 'telegraf/typings/context';
import { logger } from '../../helpers/logger/logger';
import { parseAucDate } from '../../helpers/parser/skylots';

const NAMESPACE = 'auc-task.ts';

const createAucTask = async (ctx: TelegrafContext) => {
  const url = ctx.message?.text;
  if (!url) return null;
  const date = await parseAucDate(url);
  const chatId = ctx.chat?.id;
  if (!date || !chatId) return null;
  const task = { date, chatId, url };
  logger.info(NAMESPACE, 'new task', task);
};

export {
  createAucTask,
};
