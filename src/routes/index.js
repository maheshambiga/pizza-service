import { Router } from 'express';
import auth from './auth/auth.route';
import user from './user/user.route';
import inventory from './inventory/inventory.route';
import pizza from './pizza/pizza.route';
import topping from './toppings/toppings.route';
import productSKU from './productSKU/productSKU.route';
import category from './category/category.route';
import cart from './Cart/cart.route';
export default () => {
    const router = Router();
    auth(router);
    user(router);
    category(router);
    topping(router);
    inventory(router);
    productSKU(router);
    pizza(router);
    cart(router);
    return router;
}
