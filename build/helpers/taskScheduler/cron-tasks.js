"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunThourghTasks = exports.cronFetchTasks = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const _1 = require(".");
const bot_1 = require("../../telegram/bot");
const logger_1 = require("../logger/logger");
const NAMESPACE = 'cron-tasks.ts';
/**
 * will run every 3 hours and fetch data from DB
 */
const cronFetchTasks = node_cron_1.default.schedule('0 */3 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield _1.tasksStore.setTasks();
    logger_1.logger.info(NAMESPACE, 'fetching tasks from DB');
}));
exports.cronFetchTasks = cronFetchTasks;
/**
 * will run every 1 minute and trigger task to run through fetched Auc tasks
 */
const cronRunThourghTasks = node_cron_1.default.schedule('*/1 * * * *', () => {
    logger_1.logger.info(NAMESPACE, 'running through tasks');
    _1.task(bot_1.bot);
});
exports.cronRunThourghTasks = cronRunThourghTasks;
