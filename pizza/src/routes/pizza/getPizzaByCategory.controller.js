import httpStatus from 'http-status';
import PizzaModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const getPizzaByCategoryController = async (req, res) => {
    logger.debug('Calling GET PIZZA BY CATEGORY endpoint with params: %o', req.params);
    const categoryId = req.params.categoryId;
    try {

        let pizzaRecords = await PizzaModel.find({categoryId}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched all pizzas.', 'data': {
                ...pizzaRecords
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getPizzaByCategoryController;
