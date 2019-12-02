import { GraphQLObjectType } from "graphql";

import { readArgs } from "./arguments";

export default new GraphQLObjectType({
  name: "Inventory",
  fields: () => ({
    ...readArgs
  })
});
