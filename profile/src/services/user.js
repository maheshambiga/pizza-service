import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import axios from 'axios';
import logger from './../utils/logger';
import config from './../utils/config';

import User from './../mongo/models/user.model';

export async function signUp(user) {
    const { password } = user;
    try {
        const userQuery = User.findOne({ email: user.email });
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
    const userRecord = await User.findOne({ email }).exec();
    if (!userRecord) {
        Promise.reject('User not registered');
    }
    const validPassword = await decryptHash(password, userRecord.password);
    if (validPassword) {
        const user = userRecord.toObject();
        const token = generateToken(user);
        return { token, userId: user._id };
    }
    return Promise.reject('Invalid username or password');
}


function generateToken(user) {
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
        { expiresIn: config.jwtTokenLife }
    );
}

export const attachCurrentUser = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await axios({
            method: 'get',
            url: config.validateTokenApi,
            headers: { ...token && { 'x-access-token': token } }
        });
        if (response) {
            const { data: { userId } } = response.data;
            const userRecord = await User.findOne({ _id: userId }).exec();
            const { firstName, lastName, email, role } = userRecord.toObject();
            req.user = { _id: userId, firstName, lastName, email, role };
            return next();
        }
        return next();
    } catch (e) {
        return res.status(401).send(e);
    }
};


export function generateHash(input) {
    return bcrypt.hashSync(input, bcrypt.genSaltSync(8), null);
}

export function decryptHash(userInput, existingInput) {
    return bcrypt.compareSync(userInput, existingInput);
}
