import CategoryModel from './../../mongo/models/category.model';
import logger from "../../utils/logger";

const removeCategoryController = async (req, res) => {
    logger.debug('Calling REMOVE CRUST endpoint with body: %o', req.body);
    const _id = req.query.body;
    try {

        let categoryRecord = await CategoryModel.findOneAndRemove(_id).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Deleted crust.', 'data': {
                id: categoryRecord._id
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default removeCategoryController;
