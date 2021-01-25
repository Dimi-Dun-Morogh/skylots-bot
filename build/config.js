"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO = exports.BOT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BOT_TOKEN = process.env.botToken || '';
const BOT = {
    token: BOT_TOKEN,
};
exports.BOT = BOT;
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
};
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'supersecretpassword1';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'dbname';
const MONGO = {
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    dbName: MONGO_DB_NAME,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.osoyd.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
};
exports.MONGO = MONGO;
