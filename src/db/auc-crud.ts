import { createItem, deleteItem, getAllItems } from './db-crud';
import AucTaskModel from '../models/task';
import { INewTask } from '../interfaces/auc-task';
import { logger } from '../helpers/logger/logger';

const NAMESPACE = 'auc-crud.ts';

const newAucTaskDB = async (newtask:INewTask) : Promise<any> => {
  try {
    const res = await createItem(AucTaskModel, newtask);
    return res;
  } catch (error) {
    logger.info(NAMESPACE, 'error creating task', error);
  }
};

const deleteAucTask = async (id:number|string) :Promise<any> => {
  try {
    const deleted = await deleteItem(AucTaskModel, id);
    return deleted;
  } catch (error) {
    logger.info(NAMESPACE, 'error deleting task', error);
  }
};

const getAllAucTasks = async () :Promise<any | []> => {
  try {
    const alltasks = await getAllItems(AucTaskModel);
    console.log(alltasks);
    return alltasks;
  } catch (error) {
    logger.info(NAMESPACE, 'error getting all tasks', error);
  }
};

const getAucTasksFor24Hours = async (): Promise<[any]> => {
  const todaysNight = new Date();
  todaysNight.setHours(23, 59, 0, 0);
  const tasks = await AucTaskModel.find({ date: { $lte: Number(todaysNight) } }).exec();
  logger.info(NAMESPACE, `fetching tasks 24 hrs, tasks found ${tasks.length}`);
  return tasks;
};

export {
  newAucTaskDB,
  deleteAucTask,
  getAllAucTasks,
  getAucTasksFor24Hours,
};
