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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.allAucTasks = exports.createAucTask = void 0;
const logger_1 = require("../../helpers/logger/logger");
const skylots_1 = require("../../helpers/parser/skylots");
const auc_crud_1 = require("../../db/auc-crud");
const taskScheduler_1 = require("../../helpers/taskScheduler");
const renderMsgs_1 = require("../../helpers/renderMsgs/renderMsgs");
const NAMESPACE = 'auc-task.ts';
const createAucTask = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const url = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text;
        if (!url)
            return null;
        const date = yield skylots_1.parseAucDate(url);
        const chatId = (_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id;
        if (!date || !chatId)
            return null;
        const task = { date: Number(date), chatId, url };
        const newTask = yield auc_crud_1.newAucTaskDB(task);
        logger_1.logger.info(NAMESPACE, 'new task', newTask);
        // let's fetch new tasks and set them in store;
        taskScheduler_1.tasksStore.setTasks();
        ctx.reply(`напоминание для ${url} создано! бот пришлет сообщение за 10 минут до окончания аукциона`);
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error creating task', error);
    }
});
exports.createAucTask = createAucTask;
const allAucTasks = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const tasks = yield auc_crud_1.getAucTasksByChatId((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id);
        const text = yield renderMsgs_1.renderAllTasks(tasks);
        //  console.log(text);
        text.forEach((task) => ctx.replyWithHTML(task));
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error allAucTasks', error);
    }
});
exports.allAucTasks = allAucTasks;
const deleteTask = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const text = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.text;
        const [, id] = text.split(' ');
        if (!id)
            return ctx.reply('отправьте id, пример комманды  - /delete 6005b8681f3d3031a0935c5f');
        const res = yield auc_crud_1.deleteAucTask(id);
        if (!res)
            return ctx.reply('похоже вы неправильно указали id или он уже удален');
        taskScheduler_1.tasksStore.setTasks();
        ctx.reply(`удаление успешно ${id}`);
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error deleting task', error.message);
    }
});
exports.deleteTask = deleteTask;
