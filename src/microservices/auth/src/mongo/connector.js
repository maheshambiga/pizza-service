import mongoose from "mongoose";
import config from "./../utils/config";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoReconnect: true,
  reconnectTries: 30,
  reconnectInterval: 1000,
  useFindAndModify: false
};

const connectMongo = async () => {
  const url = config.databaseURL;
  try {
    const connection = await mongoose.connect(url, options);
    return connection.connection.db;
  } catch (e) {
    return e;
  }
};

export default connectMongo;
