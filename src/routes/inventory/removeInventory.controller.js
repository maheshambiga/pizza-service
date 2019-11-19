import PizzaModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const removeInventoryController = async (req, res) => {
    logger.debug('Calling REMOVE INVENTORY endpoint with body: %o', req.body);
    const _id = req.query.body;
    try {

        let pizzaRecord = await PizzaModel.findOneAndRemove(_id).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Deleted pizza.', 'data': {
                id: pizzaRecord._id
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default removeInventoryController;
