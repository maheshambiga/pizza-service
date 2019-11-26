import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from "graphql";

import categoryArguments from "../category/arguments";

const category = new GraphQLObjectType({
  name: "category",
  fields: () => categoryArguments
});

export const mutationArgs = {
  id: { type: GraphQLID },
  name: { type: new GraphQLNonNull(GraphQLString) },
  categoryId: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: GraphQLString }
};

export const readArgs = {
  id: { type: GraphQLID },
  name: { type: new GraphQLNonNull(GraphQLString) },
  category: { type: category },
  description: { type: GraphQLString }
};
