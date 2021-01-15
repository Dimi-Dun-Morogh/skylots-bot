import { logger } from './helpers/logger/logger';
import { bot } from './telegram/bot';
import { connectDb } from './db/db-connect';

const NAMESPACE = 'app.ts';

bot.launch().then(() => logger.info(NAMESPACE, 'bot up and running'));

connectDb().then(() => logger.info(NAMESPACE, 'connect to DB success'));

// const url = 'https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4';
