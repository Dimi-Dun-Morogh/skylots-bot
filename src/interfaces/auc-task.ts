import { Document } from 'mongoose';

interface INewTask {
  date: number;
  chatId: number;
  url: string;
}

interface IAucInfo {
  price: string;
  lotName: string;
  imageUrl?: string;
}

interface IFetchedTask extends INewTask {
  _id: number;
}
export default interface ITask extends INewTask, Document {}

export { INewTask, IAucInfo, IFetchedTask };
