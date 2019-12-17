import redis from 'redis';
import config from './../utils/config';

const connectRedis = () => {
    return new Promise((resolve, reject) => {
        const redisClient = redis.createClient({ host: config.redisConnector.uri, port: config.redisConnector.port });

        redisClient.on('ready', () => {
            console.log('redis is ready to accept connections');
        });
        redisClient.on('connect', () => {
            console.log('redis connected');
            resolve(redisClient);
        });
        redisClient.on('error', () => {
            reject("Error: Failed to connect!");
        });
    })
};

export default connectRedis;
