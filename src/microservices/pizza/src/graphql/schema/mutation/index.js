import { GraphQLObjectType } from "graphql";

import {
  addCategory,
  removeCategory,
  updateCategory
} from "../../nodes/category/mutation";

import { addInventory } from "../../nodes/inventory/mutation";
console.log("Add category is---", addCategory);
console.log("Add inventory is---", addInventory);

export default new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCategory,
    removeCategory,
    updateCategory,
    addInventory
  }
});
