import { mutationArgs } from "./arguments";

import InventoryType from "./schema";
import CategoryModel from "./model";
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
    return CategoryModel.find({ _id: args.categoryId, name: args.name }).then(
      category =>
        new InventoryModel({
          ...args,
          category
        }).save()
    );
  }
};

// export const removeCategory = {
//   type: InventoryType,
//   args: {
//     id
//   },
//   resolve(parent, args) {
//     return InventoryModel.deleteOne({ _id: args.id });
//   }
// };

// export const updateCategory = {
//   type: InventoryType,
//   args: {
//     id,
//     name
//   },
//   resolve(parent, args) {
//     return InventoryModel.findOneAndUpdate(
//       { _id: args.id },
//       { name: args.name },
//       { new: true }
//     );
//   }
// };
