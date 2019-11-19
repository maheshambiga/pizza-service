import CategoryModel from './../../mongo/models/category.model';
import logger from "../../utils/logger";

const updateCategoryController = async (req, res) => {
    logger.debug('Calling UPDATE CATEGORY endpoint with body: %o', req.body);
    try {
        const _id = req.body.id;
        const {name} = req.body;
        const payLoad = {
            ...(name) && {name}
        };
        await CategoryModel.findOneAndUpdate({_id}, {...payLoad});
        let updateCrustRecord = await CategoryModel.findOne({_id}).exec();

        res.status(200).json({
            'statusCode': 200, 'message': 'Category got updated.', 'data': {
                ...updateCrustRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }
};

export default updateCategoryController;
