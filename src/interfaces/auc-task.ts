import { Document } from 'mongoose';

export default interface ITask extends Document {
  date: number,
  chatId: number,
  url: string
}
