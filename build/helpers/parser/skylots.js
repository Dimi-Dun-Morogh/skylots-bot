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
exports.parseAucInfo = exports.parseAucDate = void 0;
const logger_1 = require("../logger/logger");
const fetch = require('node-fetch');
const chrono = require('chrono-node');
const cheerio = require('cheerio');
const { months } = require('../dictionary/index');
const NAMESPACE = 'parser/skylots';
const dateFromString = (date) => {
    const [day, month, year, time] = date.split(' ');
    const parsed = chrono.parseDate(`${day} ${months[month]} ${year} ${time}`);
    return parsed;
};
const parseAucDate = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(url).then((response) => response.text());
        const $ = cheerio.load(data);
        const date = $('.lotendtime').first('span').first('span').text(); // 2 час. (22 дек 2020 21:00:00) ..etc
        const regExp = /\(([^)]+)\)/;
        const parsed = regExp.exec(date);
        return parsed !== null ? dateFromString(parsed[1]) : parsed; // Date or null
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, error.message, error);
        return null;
    }
});
exports.parseAucDate = parseAucDate;
const parseAucInfo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // const data = await parseWithNightMare(url);
    const data = yield fetch(url).then((response) => response.text());
    const $ = cheerio.load(data);
    const price = $('.lot_price ').text().trim();
    const lotName = $('.lot_hc').first('h1').text().trim();
    return {
        price,
        lotName,
    };
});
exports.parseAucInfo = parseAucInfo;
