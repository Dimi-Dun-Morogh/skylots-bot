import { Document } from 'mongoose';

interface INewTask {
  date: number,
  chatId: number,
  url: string
}

interface IAucInfo {
  price: string
  lotName: string
}
export default interface ITask extends INewTask, Document {
}

export {
  INewTask,
  IAucInfo,
};
