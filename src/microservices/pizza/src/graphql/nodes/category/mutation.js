import argumentObject from "./arguments";

import CategoryType from "./schema";
import CategoryModel from "./model";

const { id, name } = argumentObject;

export const addCategory = {
  type: CategoryType,
  args: {
    name
  },
  resolve(parent, args) {
    return new CategoryModel({
      ...args
    }).save();
  }
};

export const removeCategory = {
  type: CategoryType,
  args: {
    id
  },
  resolve(parent, args) {
    return CategoryModel.deleteOne({ _id: args.id });
  }
};

export const updateCategory = {
  type: CategoryType,
  args: {
    id,
    name
  },
  resolve(parent, args) {
    return CategoryModel.findOneAndUpdate(
      { _id: args.id },
      { name: args.name },
      { new: true }
    );
  }
};
