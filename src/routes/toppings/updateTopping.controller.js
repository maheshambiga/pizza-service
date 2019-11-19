import ToppingModel from './../../mongo/models/topping.model';
import logger from "../../utils/logger";

const updateToppingController = async (req, res) => {
    logger.debug('Calling UPDATE TOPPING endpoint with body: %o', req.body);
    try {
        const _id = req.body.id;
        const {name, category, price} = req.body;
        const payLoad = {
            ...(name) && {name},
            ...(category) && {category},
            ...(price) && {price}
        };
        await ToppingModel.findOneAndUpdate({_id}, {...payLoad});
        let updateToppingRecord = await ToppingModel.findOne({_id}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Toppong got updated.', 'data': {
                ...updateToppingRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default updateToppingController;
