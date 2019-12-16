import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import bcrypt from 'bcrypt';
import logger from './../utils/logger';
import config from './../utils/config';

import User from './../mongo/models/user.model';

export async function signUp(user) {
    const {password} = user;
    try {
        const userQuery = User.findOne({email: user.email});
        const dbUser = await userQuery.exec();
        if (!dbUser) {
            const userRecord = await User.create({
                ...user,
                password: generateHash(password)
            });
            if (!userRecord) {
                return {
                    statusCode: 400, message: "User cannot be created!"
                }
            }

            return {
                statusCode: 200, message: "User successfully created!"
            }
        }
        return {
            statusCode: 400, message: "Email already exists!"
        };
    } catch (e) {
        logger.error(e);
        throw new Error(e);
    }

}

export async function signIn(email, password) {
    const userRecord = await User.findOne({email}).exec();
    if (!userRecord) {
        Promise.reject('User not registered');
    }
    const validPassword = await decryptHash(password, userRecord.password);
    if (validPassword) {
        const user = userRecord.toObject();
        const token = generateToken(user);
        return {token, userId: user._id};
    }
    return Promise.reject('Invalid username or password');
}


function generateToken(user) {
    console.log('token life-->', config.jwtTokenLife);
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    logger.silly(`Sign JWT for userId: ${user._id}`);

    return jwt.sign(
        {
            _id: user._id, // We are gonna use this in the middleware 'isAuth'
            role: user.role
        },
        config.jwtSecret,
        {expiresIn: config.jwtTokenLife}
    );
}

export const verifyToken = expressJwt({
    secret: config.jwtSecret,
    getToken: (req) => {
        if (req.headers['x-access-token'] || req.headers["authorization"]) {
            return req.headers['x-access-token'] || req.headers["authorization"];
        }
        return null;
    }
});
export const attachCurrentUser = async (req, res, next) => {
    const {_id} = req.user;
    try{
        const userRecord = await User.findOne({_id: _id}).exec();
        const {firstName, lastName, email, role} = userRecord.toObject();
        req.user = {_id, firstName, lastName, email, role};
        return next();
    }catch (err) {
        logger.error('🔥 Error attaching user to req: %o', err);
        return next(err);
    }
};


export const checkTokenPresence = function(req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send({statusCode: 401, message: "Access denied. No token provided."});

    next();
};

export function generateHash(input) {
    return bcrypt.hashSync(input, bcrypt.genSaltSync(8), null);
}

export function decryptHash(userInput, existingInput) {
    return bcrypt.compareSync(userInput, existingInput);
}
