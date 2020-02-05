import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import addInventoryController from './addInventory.controller';
import updateInventoryController from './updateInventory.controller';
import getInventoryController from './getInventory.controller';
import removeInventoryController from './removeInventory.controller';
import {verifyToken, checkTokenPresence, attachCurrentUser} from './../../services/auth';
const route = Router();

export default (router) => {
    router.use('/inventory', route);

    route.post(
        '/add',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                categoryId: Joi.string().required(),
                toppings: Joi.array().required()
            }),
        }),
        addInventoryController
    );
    route.put(
        '/update',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().optional(),
                description: Joi.string().optional(),
                categoryId: Joi.string().optional(),
                toppings: Joi.array().optional(),
            }),
        }),
        updateInventoryController
    );
    route.get(
        '/get/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        getInventoryController
    );
    route.delete(
        '/remove',
        celebrate({
            body: Joi.object({
                id: Joi.string().required()
            })
        }),
        removeInventoryController
    );
};
