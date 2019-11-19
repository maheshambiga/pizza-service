import logger from "../../utils/logger";
import PizzaModel from "../../mongo/models/pizza.model";

const updateProductSKUController = async (req, res) => {
    logger.debug('Calling UPDATE SKU endpoint with body: %o', req.body);
    try {
        const _id = req.body.id;
        const {skuId, size, crust, price} = req.body;

        const preDoc = await PizzaModel.findOne({'_id': _id,  'skus._id': skuId}).exec();

        const payLoad = {
            ...(size) && {size},
            ...(crust) && {crust},
            ...(price) && {price}
        };

        const mergeDoc = {...preDoc.skus[0].toObject(), ...payLoad};

        await PizzaModel.findOneAndUpdate({'_id': _id, 'skus._id': skuId},
            {'$set': {'skus.$': mergeDoc}}).exec();

        let updateSkuRecord = await PizzaModel.findOne({'_id': _id}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Sku got updated.', 'data': {
                ...updateSkuRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default updateProductSKUController;
