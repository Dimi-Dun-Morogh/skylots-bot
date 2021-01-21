import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN : string = process.env.botToken || '';

const BOT = {
  token: BOT_TOKEN,
};

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

export {
  BOT,
  MONGO,
};
