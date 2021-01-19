import { IAucInfo, IFetchedTask } from '../../interfaces/auc-task';
import { parseAucInfo } from '../parser/skylots';

const renderAllTasks = async (arrayOfTaks:[any]): Promise<string> => {
  // переписать циклом
  let res = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const task of arrayOfTaks) {
    // const task: IFetchedTask = arrayOfTaks[i];
    const { url, date, _id } = task;
    const aucDate = new Date(date);
    // eslint-disable-next-line no-await-in-loop
    const aucInfo: IAucInfo = await parseAucInfo(url);
    const resString = `аукцион: ${
      aucInfo.lotName
    }\n<i>заканчивается</i>: ${aucDate.toLocaleString()}\nцена: <b>${
      aucInfo.price
    }</b>\n ${url}\n id: ${_id}\n\n`;
    res += resString;
  }
  return res;
};

export {
  renderAllTasks,
};
