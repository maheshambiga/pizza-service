import {Router} from 'express';
import addProductSKUController from './addProductSKU.controller';
import updateProductSKUController from './updateProductSKU.controller';
import {celebrate, Joi} from "celebrate";
import removeProductSKUController from "./removeProductSKU.controller";
import getProductSKUController from "./getProductSKU.controller";

const route = Router();

export default (router) => {
    router.use('/addSKU', route);

    route.post(
        '/add',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                size: Joi.string().required(),
                crust: Joi.string().required(),
                price: Joi.number().required(),
            }),
        }),
        addProductSKUController
    );

    route.put(
        '/update',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                skuId: Joi.string().required(),
                size: Joi.string().optional(),
                crust: Joi.string().optional(),
                price: Joi.number().optional(),
            }),
        }),
        updateProductSKUController
    );

    route.get(
        '/get/:id/:skuId',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
                skuId: Joi.string().required()
            })
        }),
        getProductSKUController
    );

    route.delete(
        '/remove',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                skuId: Joi.string().required()
            })
        }),
        removeProductSKUController
    );


};
