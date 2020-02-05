import PizzaModel from './../../mongo/models/pizza.model';
import logger from "../../utils/logger";

const updateInventoryController = async (req, res) => {
    logger.debug('Calling UPDATE INVENTORY endpoint with body: %o', req.body);
    try {
        const _id = req.body.id;
        const {name, description, category, toppings, price} = req.body;
        const payLoad = {
            ...(name) && {name},
            ...(description) && {description},
            ...(category) && {category},
            ...(toppings) && {toppings},
            ...(price) && {price}
        };
        await PizzaModel.findOneAndUpdate({_id}, {...payLoad});
        let updatePizzaRecord = await PizzaModel.findOne({_id}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Pizza got updated.', 'data': {
                ...updatePizzaRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default updateInventoryController;
