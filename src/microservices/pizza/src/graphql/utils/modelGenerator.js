import { Schema, model } from 'mongoose';

export default ({ name, fields }) => {
  const schema = new Schema({
    ...fields
  });
  return model(name, schema);
};
