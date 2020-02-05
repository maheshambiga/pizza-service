import httpStatus from 'http-status';
import ProductModel from "../../mongo/models/pizza.model";
import logger from "../../utils/logger";


const addToppingController = async (req, res) => {
    logger.debug('Calling ADD ADDITIONAL TOPPING endpoint with body: %o', req.body);
    try {
        const {id, toppingId} = req.body;

        const productRecord = await ProductModel.update({'_id': id}, {'$push': {extraToppings: toppingId}}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Additional topping got added.', 'data': {
                ...productRecord
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default addToppingController;
