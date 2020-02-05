import expressJwt from 'express-jwt';
import config from './../utils/config';

export const verifyToken = expressJwt({
    secret: config.jwtSecret,
    getToken: (req) => {
        if (req.headers['x-access-token'] || req.headers["authorization"]) {
            return req.headers['x-access-token'] || req.headers["authorization"];
        }
        return null;
    }
});



export const checkTokenPresence = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send({ statusCode: 401, message: "Access denied. No token provided." });

    next();
};
