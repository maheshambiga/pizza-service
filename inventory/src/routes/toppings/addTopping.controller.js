import httpStatus from 'http-status';
import ToppingModel from './../../mongo/models/topping.model';
import logger from "../../utils/logger";

const addToppingController = async (req, res) => {
    logger.debug('Calling ADD TOPPING endpoint with body: %o', req.body);
    try {
        const {name, categoryId, price} = req.body;
        const topping = new ToppingModel();
        topping.set('name', name);
        topping.set('categoryId', categoryId);
        topping.set('price', price);
        const toppingObj = await topping.save();

        res.status(200).json({
            'statusCode': 200, 'message': 'Topping got added.', 'data': {
                ...toppingObj.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default addToppingController;
