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
exports.tasksStore = exports.task = void 0;
const tasksStore_1 = __importDefault(require("./tasksStore"));
exports.tasksStore = tasksStore_1.default;
const logger_1 = require("../logger/logger");
const skylots_1 = require("../parser/skylots");
const auc_crud_1 = require("../../db/auc-crud");
const NAMESPACE = 'taskScheduler';
const compareDates = (aucDate) => {
    const timeOfAuc = aucDate.getTime();
    const timeNow = new Date().getTime();
    const hoursDifference = timeOfAuc - timeNow;
    const minDiff = hoursDifference / 60 / 1000; // in minutes if 10 or < 10 =>fire action
    return minDiff <= 10;
};
const task = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get tasks for current day here  ????
        const arrayOfTaks = Object.values(tasksStore_1.default.tasks);
        logger_1.logger.info(NAMESPACE, `tasks to go through: ${arrayOfTaks.length}`);
        if (!arrayOfTaks.length)
            return;
        arrayOfTaks.forEach((taskItem) => __awaiter(void 0, void 0, void 0, function* () {
            const { chatId, url, date, _id } = taskItem;
            const aucDate = new Date(date);
            const isItTime = compareDates(aucDate);
            if (isItTime) {
                const aucInfo = yield skylots_1.parseAucInfo(url);
                logger_1.logger.info(NAMESPACE, `it is time for task ${_id}`);
                const textToSend = `аукцион: ${aucInfo.lotName}\n<i>заканчивается</i>: ${aucDate.toLocaleString()}\nцена: <b>${aucInfo.price}</b>\n ${url}`;
                yield bot.telegram.sendMessage(chatId, textToSend, {
                    parse_mode: 'HTML',
                });
                // что-то сделать с aucInfo.imageUrl
                // await bot.telegram.sendPhoto(chatId, 'https://skylots.org/images/images/n/84/0484f8b14ea14878f734bb8f3177e097.jpg', { caption: textToSend, parse_mode: 'HTML' });
                logger_1.logger.info(NAMESPACE, `message sent to chat id: ${chatId}`);
                // delete task  from db here
                yield auc_crud_1.deleteAucTask(_id);
                tasksStore_1.default.removeTask(_id);
            }
        }));
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, error.message, error);
    }
});
exports.task = task;
