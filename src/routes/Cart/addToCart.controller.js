import httpStatus from 'http-status';
import mongoose from 'mongoose';
import logger from "../../utils/logger";
import ProductModel from './../../mongo/models/pizza.model';

const addCategoryController = async (req, res) => {
    logger.debug('Calling ADD TO CART endpoint with body: %o', req.body);
    console.log(req.user._id);
    try {
        const { id, skuId, quantity } = req.body;
        const product = await ProductModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            { $unwind: '$skus' },
            { $match: { 'skus._id': mongoose.Types.ObjectId(skuId) } },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    description: '$description',
                    toppings: '$toppings',
                    sku: { _id: '$skus._id', size: '$skus.size', crust: '$skus.crust' },
                    quantity: quantity,
                    price: { '$multiply': ['$skus.price', quantity] }
                }
            }
        ]).exec();

        req.redisClient.RPUSH(`user:${req.user._id}`, JSON.stringify(product) );

        res.status(200).json({
            'statusCode': 200, 'message': 'Pizza got added to cart.', 'data': product[0]
        });

    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
    }
};

export default addCategoryController;
