import httpStatus from 'http-status';
import mongoose from 'mongoose';
import logger from "../../utils/logger";
import ProductModel from './../../mongo/models/pizza.model';

const addCategoryController = async (req, res) => {
    logger.debug('Calling ADD TO CART endpoint with body: %o', req.body);
    try {
        const { productId, skuId, quantity } = req.body;
        const product = await ProductModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(productId) } },
            { $unwind: '$skus' },
            { $match: { 'skus._id': mongoose.Types.ObjectId(skuId) } },
            {
                $project: {
                    _id: { "$toString": "$_id" },
                    name: '$name',
                    description: '$description',
                    toppings: '$toppings',
                    sku: { _id: '$skus._id', size: '$skus.size', crust: '$skus.crust' },
                    price: { '$multiply': ['$skus.price', quantity] }
                }
            }
        ]).exec();
        const userIdStr = req.user._id.toString();
        const userId_4 = userIdStr.substring(userIdStr.length, -4);
        const productIdStr = product[0]._id.toString();
        const productId_4 = productIdStr.substring(productIdStr.length, -4);
        const skuId_str = product[0].sku._id.toString();
        const skuId_4 = skuId_str.substring(skuId_str.length, -4);

        req.redisClient.HSET(`u:${userIdStr}`, `p:${productIdStr}|sku:${skuId_str}`, JSON.stringify({...product[0], quantity}));

        res.status(200).json({
            'statusCode': 200, 'message': 'Pizza got added to cart.', 'data': {...product[0], quantity}
        });

    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
    }
};

export default addCategoryController;
