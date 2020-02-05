import { Router } from 'express';
import { validateTokenController } from './validteToken.controller';
import { checkTokenPresence, verifyToken } from "./../../services/auth";

const route = Router();

export default (router) => {
    router.use('/auth', route);

    route.get(
        '/verifyToken',
        checkTokenPresence,
        verifyToken,
        validateTokenController
    );
};
