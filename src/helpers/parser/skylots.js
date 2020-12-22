const fetch = require('node-fetch');
const chrono = require('chrono-node');
const cheerio = require('cheerio');
const { months } = require('../dictionary/index');

const url = 'https://skylots.org/6583808446/Mobilnyy+telefon+Ergo+F242+akkumulyator+3000+mAch?t=4';

const parseAuc = async (url) => {
  try {
    const data = await fetch(url).then((response) => response.text());
    const $ = cheerio.load(data);
    const date = $('.lotendtime').first('span').first('span').text(); // 2 час. (22 дек 2020 21:00:00) ..etc
    const regExp = /\(([^)]+)\)/;
    const parsed = regExp.exec(date);
    console.log(parsed[1]);
    return parsed[1]; // 22 дек 2020 21:00:00
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param date string - 22 дек 2020 21:00:00
 */
const parseDate = (date) => {
  const [day, month, year, time] = date.split(' ');
  const parsed = chrono.parseDate(`${day} ${months[month]} ${year} ${time}`);
  return parsed;
};

module.exports = {
  parseDate,
};
