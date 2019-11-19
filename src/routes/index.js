import { Router } from 'express';
import auth from './auth/auth.route';
import user from './user/user.route';
import inventory from './inventory/inventory.route';
import pizza from './pizza/pizza.route';
import topping from './toppings/toppings.route';
import productSKU from './productSKU/productSKU.route';
import category from './category/category.route';
export default () => {
    const router = Router();
    auth(router);
    user(router);
    inventory(router);
    pizza(router);
    topping(router);
    productSKU(router);
    category(router);
    return router;
}
