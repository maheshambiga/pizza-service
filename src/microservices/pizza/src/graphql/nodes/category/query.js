import { GraphQLString, GraphQLList } from "graphql";

import CategoryType from "./schema";
import CategoryModel from "./model";

export const category = {
  type: CategoryType,
  args: { ntID: { type: GraphQLString } },
  resolve(parent, args) {
    return CategoryModel.findOne({ id: args.id });
  }
};

export const categories = {
  type: GraphQLList(CategoryType),
  resolve(parent, args) {
    return CategoryModel.find({});
  }
};
