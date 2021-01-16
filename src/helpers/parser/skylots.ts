import { IAucInfo } from '../../interfaces/auc-task';

const fetch = require('node-fetch');
const chrono = require('chrono-node');
const cheerio = require('cheerio');
const { months } = require('../dictionary/index');

const dateFromString = (date: string): Date => {
  const [day, month, year, time] = date.split(' ');
  const parsed = chrono.parseDate(`${day} ${months[month]} ${year} ${time}`);
  return parsed;
};

const parseAucDate = async (url: string): Promise<Date | null> => {
  try {
    const data = await fetch(url).then((response: any) => response.text());
    const $ = cheerio.load(data);
    const date: string = $('.lotendtime').first('span').first('span').text(); // 2 час. (22 дек 2020 21:00:00) ..etc
    const regExp: RegExp = /\(([^)]+)\)/;
    const parsed: any = regExp.exec(date);
    return parsed !== null ? dateFromString(parsed[1]) : parsed; // Date or null
  } catch (error) {
    return Promise.reject(error);
  }
};

const parseAucInfo = async (url:string) : Promise<IAucInfo> => {
  const data = await fetch(url).then((response: any) => response.text());
  const $ = cheerio.load(data);
  const price :string = $('.lot_price ').text().trim();
  const lotName :string = $('.lot_hc').first('h1').text().trim();
  return {
    price,
    lotName,
  };
};

export { parseAucDate, parseAucInfo };
