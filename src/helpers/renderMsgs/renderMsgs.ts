import { IAucInfo } from '../../interfaces/auc-task';
import { parseAucInfo } from '../parser/skylots';

const { textToEmoji } = require('../dictionary/index');

const renderAllTasks = async (arrayOfTaks:[any]): Promise<string[]> => {
  const res = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const task of arrayOfTaks) {
    const { url, date, _id } = task;
    const aucDate = new Date(date);
    const aucInfo: IAucInfo = await parseAucInfo(url);
    const resString = `${textToEmoji('pin')}<b>АУКЦИОН</b>${textToEmoji('pin')}: ${
      aucInfo.lotName
    }\n\n${textToEmoji('lightning')}<i>заканчивается</i>${textToEmoji('lightning')}: ${aucDate.toLocaleString()}\n\n${textToEmoji('saintsRow')}цена${textToEmoji('saintsRow')}: <b>${
      aucInfo.price
    }</b>\n ${url}\n id: ${_id}\n\n`;
    res.push(resString);
  }
  return res;
};

export {
  renderAllTasks,
};
