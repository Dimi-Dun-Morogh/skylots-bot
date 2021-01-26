const logger = {
  getTimeStamp: (): string => new Date().toLocaleTimeString('ru-RU'),
  info(namespace: string, message: string, object?: any) {
    if (object) {
      console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] [${message}]`, object);
    } else {
      console.log(`[${this.getTimeStamp()}] [INFO] [${namespace}] [${message}]`);
    }
  },
};

export { logger };
