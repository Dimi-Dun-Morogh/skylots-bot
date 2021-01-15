import { Document } from 'mongoose';

interface INewTask {
  date: number,
  chatId: number,
  url: string
}
export default interface ITask extends INewTask, Document {
}

export {
  INewTask,
};
