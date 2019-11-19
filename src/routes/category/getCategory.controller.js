import httpStatus from 'http-status';
import CategoryModel from './../../mongo/models/category.model';
import logger from "../../utils/logger";

const getCategoryController = async (req, res) => {
    logger.debug('Calling GET CATEGORY endpoint with params: %o', req.params);
    const _id = req.params.id;
    try {

        let crustRecord = await CategoryModel.findOne({_id}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched Category.', 'data': {
                ...crustRecord.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getCategoryController;
