/* eslint-disable @typescript-eslint/naming-convention */
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import tasksStore from './tasksStore';
import { logger } from '../logger/logger';
import { parseAucInfo } from '../parser/skylots';
import { deleteAucTask } from '../../db/auc-crud';

const NAMESPACE = 'taskScheduler';

const compareDates = (aucDate: Date): boolean => {
  const timeOfAuc = aucDate.getTime();
  const timeNow = new Date().getTime();
  const hoursDifference = timeOfAuc - timeNow;
  const minDiff = hoursDifference / 60 / 1000; // in minutes if 10 or < 10 =>fire action

  return minDiff <= 10;
};

const task = async (bot: Telegraf<TelegrafContext>) => {
  try {
    // get tasks for current day here  ????
    const arrayOfTaks = Object.values(tasksStore.tasks);
    arrayOfTaks.forEach(async (taskItem) => {
      const {
        chatId, url, date, _id,
      } = taskItem;
      const aucDate = new Date(date);
      const isItTime = compareDates(aucDate);
      if (isItTime) {
        const aucInfo = await parseAucInfo(url);
        logger.info(NAMESPACE, `it is time for task ${_id}`);
        const textToSend = `аукцион ${
          aucInfo.lotName
        }\nзаканчивается ${aucDate.toLocaleString()}\nцена: ${
          aucInfo.price
        }\n ${url}`;
        await bot.telegram.sendMessage(chatId, textToSend);
        // что-то сделать с aucInfo.imageUrl
        logger.info(NAMESPACE, `message sent to chat id: ${chatId}`);
        // delete task  from db here
        await deleteAucTask(_id);
        tasksStore.removeTask(_id);
      }
    });
  } catch (error) {
    logger.info(NAMESPACE, error.message, error);
  }
};

export { task, tasksStore };
