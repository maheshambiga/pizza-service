import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
    const envFound = dotenv.config();
    if (!envFound) {
        // This error should crash whole process
        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
}


export default {
    port: parseInt(process.env.PORT, 10),
    databaseURL: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenLife: process.env.TOKEN_LIFE,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    corsOptions: {
        origin: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        exposedHeaders: ["x-access-token"]
    },
    rateLimit: {
        maxRequestsAllowed: 20,
        timeDifference: 60 // minutes
    },
    redisConnector: {
        uri: process.env.REDIS_HOST_URI,
        port: process.env.REDIS_HOST_PORT
    },
    validateTokenApi: process.env.VALIDATE_TOKEN_API
};
