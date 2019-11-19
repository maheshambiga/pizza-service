import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import addToCartController from './addToCart.controller';

const route = Router();

export default (router) => {
    router.use('/cart', route);

    route.post(
        '/add-to-cart',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                categoryId: Joi.string().required(),
                toppings: Joi.array().required()
            }),
        }),
        addToCartController
    );
};
