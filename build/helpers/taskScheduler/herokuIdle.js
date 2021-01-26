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
exports.router = exports.antiIdle = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = require("../logger/logger");
const fetch = require('node-fetch');
const NAMESPACE = 'HEROKUIDLE';
const router = express_1.default.Router();
exports.router = router;
const antiIdle = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch('https://skylotsbot.herokuapp.com/');
        logger_1.logger.info(NAMESPACE, 'fetching url success');
    }
    catch (error) {
        logger_1.logger.info(NAMESPACE, 'error fetching aintIdle url', error.message);
    }
});
exports.antiIdle = antiIdle;
router.get('/', (req, res) => {
    logger_1.logger.info(NAMESPACE, `incoming route hit / url:${req.originalUrl} ip:${req.ip}`);
    res.status(200).json('req ok');
});
