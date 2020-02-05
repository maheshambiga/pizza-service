import {Router} from 'express';
import {getProfileController} from './user.controller';
import {verifyToken, checkTokenPresence, attachCurrentUser} from './../../services/auth';
const route = Router();

export default (router) => {
    router.use('/auth', route);

    route.get(
        '/profile',
        checkTokenPresence,
        verifyToken,
        attachCurrentUser,
        getProfileController
    );
};
