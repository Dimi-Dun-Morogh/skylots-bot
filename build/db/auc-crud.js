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
exports.getAucTasksByChatId = exports.getAucTasksFor24Hours = exports.getAllAucTasks = exports.deleteAucTask = exports.newAucTaskDB = void 0;
const db_crud_1 = require("./db-crud");
const task_1 = __importDefault(require("../models/task"));
const logger_1 = require("../helpers/logger/logger");
const NAMESPACE = 'auc-crud.ts';
const newAucTaskDB = (newtask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield db_crud_1.createItem(task_1.default, newtask);
        return res;
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error creating task', error);
    }
});
exports.newAucTaskDB = newAucTaskDB;
const deleteAucTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield db_crud_1.deleteItem(task_1.default, id);
        return deleted;
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error deleting task', error);
    }
});
exports.deleteAucTask = deleteAucTask;
const getAllAucTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alltasks = yield db_crud_1.getAllItems(task_1.default);
        console.log(alltasks);
        return alltasks;
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error getting all tasks', error);
    }
});
exports.getAllAucTasks = getAllAucTasks;
const getAucTasksFor24Hours = () => __awaiter(void 0, void 0, void 0, function* () {
    const todaysNight = new Date();
    todaysNight.setHours(23, 59, 0, 0);
    const tasks = yield task_1.default.find({
        date: { $lte: Number(todaysNight) },
    }).exec();
    logger_1.logger.info(NAMESPACE, `fetching tasks 24 hrs, tasks found ${tasks.length}`);
    return tasks;
});
exports.getAucTasksFor24Hours = getAucTasksFor24Hours;
const getAucTasksByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.default.find({ chatId }).exec();
    logger_1.logger.info(NAMESPACE, `fetcing tasks for chat: ${chatId}, tasks found ${tasks.length}`);
    return tasks;
});
exports.getAucTasksByChatId = getAucTasksByChatId;
