import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Logger from "./utils/logger";
import config from "./utils/config";
import mongoConnector from "./mongo/connector";
import route from "./routes";

const startServer = async () => {
  const app = express();

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Routes
  app.use(route);

  mongoConnector().then(() => {
    Logger.info("✌️ DB loaded and connected!");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
};

startServer();
