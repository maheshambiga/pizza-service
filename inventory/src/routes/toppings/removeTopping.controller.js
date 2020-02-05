import ToppingModel from './../../mongo/models/topping.model';
import logger from "../../utils/logger";

const removeInventoryController = async (req, res) => {
    logger.debug('Calling REMOVE TOPPING endpoint with body: %o', req.body);
    const _id = req.query.body;
    try {

        let toppingRecord = await ToppingModel.findOneAndRemove(_id).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Deleted topping.', 'data': {
                id: toppingRecord._id
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default removeInventoryController;
