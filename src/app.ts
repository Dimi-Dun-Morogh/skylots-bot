import http from 'http';
import express from 'express';
import { logger } from './helpers/logger/logger';
import { bot } from './telegram/bot';
import { connectDb } from './db/db-connect';
import { task, tasksStore } from './helpers/taskScheduler';
import { cronAntiIdle, cronFetchTasks, cronRunThourghTasks } from './helpers/taskScheduler/cron-tasks';
import { router as Idleroute } from './helpers/taskScheduler/herokuIdle';
import { SERVER } from './config';

const NAMESPACE = 'app.ts';
const router = express();
router.use('/', Idleroute);

bot.launch().then(() => logger.info(NAMESPACE, 'bot up and running'));
connectDb().then(() => logger.info(NAMESPACE, 'connect to DB success'));

tasksStore.setTasks().then(() => task(bot));

cronFetchTasks.start();
cronRunThourghTasks.start();
cronAntiIdle.start();

const httpServer = http.createServer(router);
httpServer.listen(SERVER.port, () => logger.info(NAMESPACE, `SERVER RUNNING ON ${SERVER.hostname}: ${SERVER.port}`));

// console.log(new Date(1612639380000).toLocaleString());
