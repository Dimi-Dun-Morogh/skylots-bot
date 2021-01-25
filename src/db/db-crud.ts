import { Model } from 'mongoose';

const getItemById = (collection: Model<any>, id: number) => collection.findById(id);
const getAllItems = (collection: Model<any>) => collection.find();
const createItem = (collection: Model<any>, data: Object) => collection.create(data);
const deleteItem = (collection: Model<any>, id: number | string) => collection.findOneAndRemove({ _id: id });
const updateItem = (collection: Model<any>, data: Object) => createItem(collection, data);

export { getItemById, getAllItems, createItem, deleteItem, updateItem };
