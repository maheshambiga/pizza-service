import { GraphQLObjectType } from "graphql";

import argumentObject from "./arguments";

export default new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    ...argumentObject
  })
});
