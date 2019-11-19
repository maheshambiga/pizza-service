import PizzaModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const addInventoryController = async (req, res) => {
    logger.debug('Calling ADD INVENTORY endpoint with body: %o', req.body);
    console.log('user', JSON.stringify(req.user));
    try{
        const {name, description, categoryId, toppings} = req.body;
        const pizza = new PizzaModel();
        pizza.set('name', name);
        pizza.set('description', description);
        pizza.set('categoryId', categoryId);
        pizza.set('toppings', toppings);
        const pizzaObj = await pizza.save();

        res.status(200).json({
            'statusCode': 200, 'message': 'Pizza got added.', 'data': {
                ...pizzaObj.toObject()
            }
        });
    }catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default addInventoryController;
