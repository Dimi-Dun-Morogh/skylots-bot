import { logger } from './helpers/logger/logger';
import { bot } from './telegram/bot';
import { connectDb } from './db/db-connect';
import { task, tasksStore } from './helpers/taskScheduler';
import { cronFetchTasks, cronRunThourghTasks } from './helpers/taskScheduler/cron-tasks';

const NAMESPACE = 'app.ts';
bot.launch().then(() => logger.info(NAMESPACE, 'bot up and running'));
connectDb().then(() => logger.info(NAMESPACE, 'connect to DB success'));

tasksStore.setTasks().then(() => task(bot));

cronFetchTasks.start();
cronRunThourghTasks.start();
