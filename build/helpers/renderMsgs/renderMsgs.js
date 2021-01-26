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
exports.renderAllTasks = void 0;
const skylots_1 = require("../parser/skylots");
const { textToEmoji } = require('../dictionary/index');
const renderAllTasks = (arrayOfTaks) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const task of arrayOfTaks) {
        const { url, date, _id } = task;
        const aucDate = new Date(date);
        const aucInfo = yield skylots_1.parseAucInfo(url);
        const resString = `${textToEmoji('pin')}<b>АУКЦИОН</b>${textToEmoji('pin')}: ${aucInfo.lotName}\n\n${textToEmoji('lightning')}<i>заканчивается</i>${textToEmoji('lightning')}: ${aucDate.toLocaleString('ru-RU')}\n\n${textToEmoji('saintsRow')}цена${textToEmoji('saintsRow')}: <b>${aucInfo.price}</b>\n ${url}\n id: ${_id}\n\n`;
        res.push(resString);
    }
    return res;
});
exports.renderAllTasks = renderAllTasks;
