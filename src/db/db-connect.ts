import mongoose from 'mongoose';
import { MONGO } from '../config';

const connectDb = () => mongoose.connect(MONGO.url, MONGO.options);

export {
  connectDb,
};
