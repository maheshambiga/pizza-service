import { GraphQLObjectType } from "graphql";

// queries
import { category, categories } from "../../nodes/category/query";
import { inventory, inventories } from "../../nodes/inventory/query";

export default new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    category,
    categories,
    inventory,
    inventories
  }
});
