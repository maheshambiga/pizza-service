import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import getPizzaController from './getPizza.controller';
import getPizzaByCategory from './getPizzaByCategory.controller';
import addToppingController from "./addTopping.controller";

const route = Router();

export default (router) => {
    router.use('/pizza', route);

    route.get(
        '/get/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        getPizzaController
    );
    route.get(
        '/get-by-category/:categoryId',
        celebrate({
            params: Joi.object({
                categoryId: Joi.string().required()
            })
        }),
        getPizzaByCategory
    );
    route.post(
        '/add-topping',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                toppingId: Joi.string().required()
            }),
        }),
        addToppingController
    );
};
