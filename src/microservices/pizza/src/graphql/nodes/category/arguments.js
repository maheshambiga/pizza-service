import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";

export default {
  id: { type: GraphQLID },
  name: { type: new GraphQLNonNull(GraphQLString) }
};
