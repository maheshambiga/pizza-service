import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import addToCartController from './addToCart.controller';
import getCartController from './getCart.controller';
import removeCartHandler from './removeCart.controller';
import redisConnector from '../../services/redis-connector';
import logger from "../../utils/logger";
import { checkTokenPresence, verifyToken, attachCurrentUser } from './../../services/auth';

const cartRouter = Router();

export default (router) => {
    router.use('/cart', checkTokenPresence, verifyToken, attachCurrentUser, (req, res, next) => {
        if (!req.redisClient) {
            logger.debug('No redis client present in the header!');
            // TODO - this is getting called over and over. Should load only once.
            redisConnector().then((client) => {
                req.redisClient = client;
                next();
            }).catch((err) => {
                logger.error('🔥 error: %o', err);
            });
        } else {
            logger.debug('Redis client is present in the header!');
            next();
        }
    }, cartRouter);


    cartRouter.post(
        '/add',
        celebrate({
            body: Joi.object({
                productId: Joi.string().required(),
                skuId: Joi.string().required(),
                quantity: Joi.number().required()
            }),
        }),
        addToCartController
    );

    cartRouter.get(
        '/:userId',
        celebrate({
            params: Joi.object({
                userId: Joi.string().required()
            }),
        }),
        getCartController
    );

    cartRouter.delete(
        '/remove',
        celebrate({
            body: Joi.object({
                productId: Joi.string().required(),
                skuId: Joi.string().required()
            }),
        }),
        removeCartHandler
    );

};
