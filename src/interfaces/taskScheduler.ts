import { INewTask } from './auc-task';

interface ITask extends INewTask {
  _id: string
}
interface ITasks {
  [key:string]: ITask
}

export {
  ITasks,
};
