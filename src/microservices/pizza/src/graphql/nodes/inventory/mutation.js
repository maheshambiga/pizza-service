import { mutationArgs } from "./arguments";

import InventoryType from "./schema";
import CategoryModel from "../category/model";
import InventoryModel from "./model";

const { id, name, description, categoryId } = mutationArgs;

export const addInventory = {
  type: InventoryType,
  args: {
    id,
    name,
    description,
    categoryId
  },
  resolve(parent, args) {
    return CategoryModel.findOne({ _id: args.categoryId }).then(category => {
      const { categoryId, ...rest } = args;
      return new InventoryModel({
        ...rest,
        category: category._id
      })
        .save()
        .then(inventory =>
          InventoryModel.findOne({ _id: inventory.id }).populate("category")
        );
    });
  }
};

export const removeInventory = {
  type: InventoryType,
  args: {
    id
  },
  resolve(parent, args) {
    return InventoryModel.deleteOne({ _id: args.id });
  }
};

export const updateInventory = {
  type: InventoryType,
  args: {
    id,
    name,
    description
  },
  resolve(parent, args) {
    return InventoryModel.findOneAndUpdate(
      { _id: args.id },
      { name: args.name, description: args.description },
      { new: true }
    ).populate("category");
  }
};
