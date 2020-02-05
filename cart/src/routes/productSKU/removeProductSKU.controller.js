import logger from "../../utils/logger";
import PizzaModel from "../../mongo/models/pizza.model";

const removeProductSKUController = async (req, res) => {
    logger.debug('Calling REMOVE SKU endpoint with body: %o', req.body);
    const _id = req.query.body;
    try {

        const {id, skuId} = req.body;

        await PizzaModel.update({'_id': id}, {'$pull': {skus: {'_id': skuId}}}).exec();

        let updatePizzaRecord = await PizzaModel.findOne({_id}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Deleted sku.', 'data': {
               ...updatePizzaRecord
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default removeProductSKUController;
