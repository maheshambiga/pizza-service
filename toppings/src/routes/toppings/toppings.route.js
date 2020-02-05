import {Router} from 'express';
import addToppingController from './addTopping.controller';
import updateToppingController from './updateTopping.controller';
import {celebrate, Joi} from "celebrate";
import removeToppingController from "./removeTopping.controller";
import getToppingController from "./getTopping.controller";

const route = Router();

export default (router) => {
    router.use('/topping', route);

    route.post(
        '/add',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                categoryId: Joi.string().required(),
                price: Joi.number().required(),
            }),
        }),
        addToppingController
    );

    route.put(
        '/update',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().optional(),
                categoryId: Joi.string().optional(),
                price: Joi.number().optional(),
            }),
        }),
        updateToppingController
    );

    route.get(
        '/get/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        getToppingController
    );

    route.delete(
        '/remove',
        celebrate({
            body: Joi.object({
                id: Joi.string().required()
            })
        }),
        removeToppingController
    );


};
