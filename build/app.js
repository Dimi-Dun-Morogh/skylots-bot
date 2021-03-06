"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("./helpers/logger/logger");
const bot_1 = require("./telegram/bot");
const db_connect_1 = require("./db/db-connect");
const taskScheduler_1 = require("./helpers/taskScheduler");
const cron_tasks_1 = require("./helpers/taskScheduler/cron-tasks");
const herokuIdle_1 = require("./helpers/taskScheduler/herokuIdle");
const config_1 = require("./config");
const NAMESPACE = 'app.ts';
const router = express_1.default();
router.use('/', herokuIdle_1.router);
bot_1.bot.launch().then(() => logger_1.logger.info(NAMESPACE, 'bot up and running'));
db_connect_1.connectDb().then(() => logger_1.logger.info(NAMESPACE, 'connect to DB success'));
taskScheduler_1.tasksStore.setTasks().then(() => taskScheduler_1.task(bot_1.bot));
cron_tasks_1.cronFetchTasks.start();
cron_tasks_1.cronRunThourghTasks.start();
cron_tasks_1.cronAntiIdle.start();
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.SERVER.port, () => logger_1.logger.info(NAMESPACE, `SERVER RUNNING ON ${config_1.SERVER.hostname}: ${config_1.SERVER.port}`));
