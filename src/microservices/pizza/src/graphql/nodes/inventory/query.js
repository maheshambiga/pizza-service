import { GraphQLString, GraphQLList } from "graphql";

import InventoryType from "./schema";
import InventoryModel from "./model";

export const inventory = {
  type: InventoryType,
  args: { ntID: { type: GraphQLString } },
  resolve(parent, args) {
    return InventoryModel.findOne({ id: args.id }).populate("category");
  }
};

export const inventories = {
  type: GraphQLList(InventoryType),
  resolve(parent, args) {
    return InventoryModel.find({}).populate("category");
  }
};
