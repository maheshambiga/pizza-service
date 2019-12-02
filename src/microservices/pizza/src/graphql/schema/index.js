import { GraphQLSchema } from 'graphql';

import query from './query';
import mutation from './mutation';

module.exports = new GraphQLSchema({
  query,
  mutation
});
