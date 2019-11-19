import httpStatus from 'http-status';
import PizzaModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const getInventoryController = async (req, res) => {
    logger.debug('Calling GET INVENTORY endpoint with params: %o', req.params);
    const _id = req.params.id;
    try {

        let pizzaRecord = await PizzaModel.findOne({_id}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched pizza.', 'data': {
                ...pizzaRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getInventoryController;
