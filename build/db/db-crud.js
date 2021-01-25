"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.createItem = exports.getAllItems = exports.getItemById = void 0;
const getItemById = (collection, id) => collection.findById(id);
exports.getItemById = getItemById;
const getAllItems = (collection) => collection.find();
exports.getAllItems = getAllItems;
const createItem = (collection, data) => collection.create(data);
exports.createItem = createItem;
const deleteItem = (collection, id) => collection.findOneAndRemove({ _id: id });
exports.deleteItem = deleteItem;
const updateItem = (collection, data) => createItem(collection, data);
exports.updateItem = updateItem;
