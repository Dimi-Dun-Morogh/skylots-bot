import cron from 'node-cron';
import { task, tasksStore } from '.';
import { bot } from '../../telegram/bot';
import { logger } from '../logger/logger';

const NAMESPACE = 'cron-tasks.ts';

/**
 * will run every 3 hours and fetch data from DB
 */
const cronFetchTasks = cron.schedule('0 */1 * * *', async () => {
  await tasksStore.setTasks();
  logger.info(NAMESPACE, 'fetching tasks from DB');
});

/**
 * will run every 1 minute and trigger task to run through fetched Auc tasks
 */
const cronRunThourghTasks = cron.schedule('*/1 * * * *', () => {
  task(bot);
  logger.info(NAMESPACE, 'running through tasks');
});

export {
  cronFetchTasks,
  cronRunThourghTasks,
};
