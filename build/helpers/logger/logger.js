"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = {
    getTimeStamp: () => new Date().toLocaleTimeString(),
    info(namespace, message, object) {
        if (object) {
            console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] [${message}]`, object);
        }
        else {
            console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] [${message}]`);
        }
    },
};
exports.logger = logger;
