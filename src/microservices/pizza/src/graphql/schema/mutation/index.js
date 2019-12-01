import { GraphQLObjectType } from "graphql";

import {
  addCategory,
  removeCategory,
  updateCategory
} from "../../nodes/category/mutation";

import {
  addInventory,
  removeInventory,
  updateInventory
} from "../../nodes/inventory/mutation";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCategory,
    removeCategory,
    updateCategory,
    addInventory,
    removeInventory,
    updateInventory
  }
});
