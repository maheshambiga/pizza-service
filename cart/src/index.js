import express from 'express';
import mongoose from "mongoose";
import Logger from './utils/logger';
import config from './utils/config';
import mongoConnector from './mongo/connector';
import expressLoader from './loaders/expressServer';


const startServer = async () => {
    const app = express();

    mongoConnector().then(() => {
        Logger.info('✌️ DB loaded and connected!');
    });

    await expressLoader(app);

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });


    app.listen(config.port, (err) => {
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
