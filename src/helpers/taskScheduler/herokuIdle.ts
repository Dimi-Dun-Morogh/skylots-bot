import express, { Request, Response } from 'express';
import { logger } from '../logger/logger';

const fetch = require('node-fetch');

const NAMESPACE = 'HEROKUIDLE';
const router = express.Router();

export const antiIdle = async () : Promise<void> => {
  try {
    await fetch('https://skylotsbot.herokuapp.com/');
    logger.info(NAMESPACE, 'fetching url success');
  } catch (error) {
    logger.info(NAMESPACE, 'error fetching aintIdle url', error.message);
  }
};

router.get('/', (req: Request, res: Response):void => {
  logger.info(NAMESPACE, `incoming route hit / url:${req.originalUrl} ip:${req.ip}`);
  res.status(200).json('req ok');
});

export {
  router,
};
