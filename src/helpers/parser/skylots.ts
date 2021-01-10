const fetch = require('node-fetch');
const chrono = require('chrono-node');
const cheerio = require('cheerio');
const { months } = require('../dictionary/index');

const url =
  'https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4';

const parseAuc = async (url: string): Promise<string> => {
  try {
    const data = await fetch(url).then((response: any) => response.text());
    const $ = cheerio.load(data);
    const date: string = $('.lotendtime').first('span').first('span').text(); // 2 час. (22 дек 2020 21:00:00) ..etc
    const regExp: RegExp = /\(([^)]+)\)/;
    const parsed: any = regExp.exec(date);
    return parsed !== null ? parsed[1] : parsed; // 22 дек 2020 21:00:00
  } catch (error) {
    return Promise.reject(error);
  }
};

const parseDate = (date: string): Date => {
  const [day, month, year, time] = date.split(' ');
  const parsed = chrono.parseDate(`${day} ${months[month]} ${year} ${time}`);
  return parsed;
};

parseAuc(url);

export { parseDate };
