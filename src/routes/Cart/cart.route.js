import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import addToCartController from './addToCart.controller';
import redisConnector from '../../services/redis-connector';
import logger from "../../utils/logger";
import { checkTokenPresence, verifyToken, attachCurrentUser } from './../../services/auth';

const cartRouter = Router();

export default (router) => {
    router.use('/cart', checkTokenPresence, verifyToken, attachCurrentUser, cartRouter);

    cartRouter.use((req, res, next) => {
        redisConnector().then((client) => {
            req.redisClient = client;
            next();
        }).catch((err) => {
            logger.error('🔥 error: %o', err);
        });
    });

    cartRouter.post(
        '/add-to-cart',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                skuId: Joi.string().required(),
                quantity: Joi.number().required()
            }),
        }),
        addToCartController
    );
};
