import mongoose, { Schema } from 'mongoose';
import ITask from '../interfaces/auc-task';

const AucTaskSchema : Schema = new Schema({
  date: { type: Number, required: true },
  chatId: { type: Number, required: true },
  url: { type: String, required: true },
});

export default mongoose.model<ITask>('AucTask', AucTaskSchema);
