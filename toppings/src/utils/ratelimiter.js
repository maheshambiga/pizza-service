import redis from 'redis';
import moment from 'moment';
import httpStatus from 'http-status';
import logger from './../utils/logger';
import config from './../utils/config';
const redisClient = redis.createClient();

const ratelimiter = (req, res, next) => {
    const userEmail = req.user || req.user.email;
    redisClient.exists(userEmail, (err, reply) => {
        if (err) {
            logger.error('🔥 Redis not working: %o', err);
            system.exit(0);
        }
        if (reply === 1) {
            // auth exists
            // check time interval
            redisClient.get(userEmail, (err, reply) => {
                let data = JSON.parse(reply);
                let currentTime = moment().unix();
                let difference = (currentTime - data.startTime) / 60;
                if (difference >= config.rateLimit.timeDifference) {
                    let body = {
                        'count': 1,
                        'startTime': moment().unix()
                    };
                    redisClient.set(userEmail, JSON.stringify(body));
                    // allow the request
                    next()
                }
                if (difference < config.rateLimit.timeDifference) {
                    if (data.count > config.rateLimit.maxRequestsAllowed) {
                        return res.status(httpStatus.UNAUTHORIZED).json({statusCode: 1, "message": "throttled limit exceeded..."})
                    }
                    // update the count and allow the request
                    data.count++;
                    redisClient.set(userEmail, JSON.stringify(data));
                    // allow request
                    next();
                }
            })
        } else {
            // add new auth
            let body = {
                'count': 1,
                'startTime': moment().unix()
            };
            redisClient.set(userEmail, JSON.stringify(body));
            // allow request
            next();
        }
    });
};
export default ratelimiter;
