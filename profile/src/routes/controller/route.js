import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { singUpController, singInController } from './users.controller';
import { getProfileController } from './getProfile.controller';
import { attachCurrentUser } from "../../services/user";

const route = Router();

export default (router) => {
    router.use('/users', route);

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().optional()
            }),
        }),
        singUpController
    );

    route.post(
        '/login',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        singInController
    );

    route.get(
        '/user',
        attachCurrentUser,
        getProfileController
    );


};
