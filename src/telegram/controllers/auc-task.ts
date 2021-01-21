import { TelegrafContext } from 'telegraf/typings/context';
import { logger } from '../../helpers/logger/logger';
import { parseAucDate } from '../../helpers/parser/skylots';
import { deleteAucTask, getAucTasksByChatId, newAucTaskDB } from '../../db/auc-crud';
import { tasksStore } from '../../helpers/taskScheduler';
import { renderAllTasks } from '../../helpers/renderMsgs/renderMsgs';

const NAMESPACE = 'auc-task.ts';
const createAucTask = async (ctx: TelegrafContext): Promise<any> => {
  try {
    const url = ctx.message?.text;
    if (!url) return null;
    const date = await parseAucDate(url);
    const chatId = ctx.chat?.id;
    if (!date || !chatId) return null;
    const task = { date: Number(date), chatId, url };
    const newTask = await newAucTaskDB(task);
    logger.info(NAMESPACE, 'new task', newTask);
    // let's fetch new tasks and set them in store;
    tasksStore.setTasks();
    ctx.reply(`напоминание для ${url} создано! бот пришлет сообщение за 10 минут до окончания аукциона`);
  } catch (error) {
    logger.info(NAMESPACE, 'error creating task', error);
  }
};

const allAucTasks = async (ctx: TelegrafContext) => {
  try {
    const tasks = await getAucTasksByChatId(ctx.chat?.id!);
    const text = await renderAllTasks(tasks);
    //  console.log(text);
    text.forEach((task) => ctx.replyWithHTML(task));
  } catch (error) {
    logger.info(NAMESPACE, 'error allAucTasks', error);
  }
};

const deleteTask = async (ctx: TelegrafContext) => {
  try {
    const text = ctx.message?.text!;
    const [,id] = text.split(' ');
    if (!id) return ctx.reply('отправьте id, пример комманды  - /delete 6005b8681f3d3031a0935c5f');
    await deleteAucTask(id);
    tasksStore.setTasks();
    ctx.reply(`удаление успешно ${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  createAucTask,
  allAucTasks,
  deleteTask,
};
