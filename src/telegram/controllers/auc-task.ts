import { TelegrafContext } from 'telegraf/typings/context';
import { logger } from '../../helpers/logger/logger';
import { parseAucDate } from '../../helpers/parser/skylots';
import { newAucTaskDB } from '../../db/auc-crud';

const NAMESPACE = 'auc-task.ts';

const createAucTask = async (ctx: TelegrafContext): Promise<any> => {
  try {
    const url = ctx.message?.text;
    if (!url) return null;
    const date = await parseAucDate(url);
    const chatId = ctx.chat?.id;
    if (!date || !chatId) return null;
    const task = { date: Number(date), chatId, url };
    const newTask = await newAucTaskDB(task);
    logger.info(NAMESPACE, 'new task', newTask);
  } catch (error) {
    logger.info(NAMESPACE, 'error creating task', error);
  }
};

export {
  createAucTask,
};
