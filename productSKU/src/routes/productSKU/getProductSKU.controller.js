import httpStatus from 'http-status';
import PizzaModel from "../../mongo/models/pizza.model";
import logger from "../../utils/logger";

const getProductSKUController = async (req, res) => {
    logger.debug('Calling GET SKU endpoint with params: %o', req.params);
    const {id, skuId} = req.params;
    try {
        let skuRecord = await PizzaModel.findOne({'_id': id, 'skus._id': skuId}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched Crust.', 'data': {
                ...skuRecord.skus[0].toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getProductSKUController;
