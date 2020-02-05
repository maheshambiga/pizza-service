import httpStatus from 'http-status';
import ToppingModel from './../../mongo/models/topping.model';
import logger from "../../utils/logger";

const getInventoryController = async (req, res) => {
    logger.debug('Calling GET TOPPING endpoint with params: %o', req.params);
    const _id = req.params.id;
    try {

        let toppingRecord = await ToppingModel.findOne({_id}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched topping.', 'data': {
                ...toppingRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getInventoryController;
