import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN : string = process.env.botToken || '';

const BOT = {
  token: BOT_TOKEN,
};

export {
  BOT,
};
