import {Router} from 'express';
import addCategoryController from './addCategory.controller';
import updateCategoryController from './updateCategory.controller';
import {celebrate, Joi} from "celebrate";
import removeCategoryController from "./removeCategory.controller";
import getCategoryController from "./getCategory.controller";
import getAllCategoryController from "./getAllCategory.controller";
const route = Router();

export default (router) => {
    router.use('/category', route);

    route.post(
        '/add',
        celebrate({
            body: Joi.object({
                name: Joi.string().required()
            }),
        }),
        addCategoryController
    );

    route.put(
        '/update',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                name: Joi.string().optional()
            }),
        }),
        updateCategoryController
    );

    route.get(
        '/get/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        }),
        getCategoryController
    );

    route.get(
        '/get-all-category',
        getAllCategoryController
    );

    route.delete(
        '/remove',
        celebrate({
            body: Joi.object({
                id: Joi.string().required()
            })
        }),
        removeCategoryController
    );


};
