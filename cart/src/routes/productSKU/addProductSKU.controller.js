import httpStatus from 'http-status';
import ProductSKUModel from './../../mongo/models/productSku.model';
import ProductModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const addProductSKUController = async (req, res) => {
    logger.debug('Calling ADD SKU endpoint with body: %o', req.body);
    try {
        const {id, size, crust, price} = req.body;
        const productSKUModel = new ProductSKUModel();
        productSKUModel.set('size', size);
        productSKUModel.set('crust', crust);
        productSKUModel.set('price', price);

        const productRecord = await ProductModel.update({'_id': id}, {'$push': {skus: productSKUModel}}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'SKU got added.', 'data': {
                ...productRecord
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default addProductSKUController;
