import httpStatus from 'http-status';
import CategoryModel from './../../mongo/models/category.model';
import logger from "../../utils/logger";

const getAllCategoryController = async (req, res) => {
    logger.debug('Calling GET ALL CATEGORY endpoint');
    try {

        let allCategoryRecord = await CategoryModel.find({}).exec();

        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Fetched All Categories.', 'data': {
                ...allCategoryRecord
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default getAllCategoryController;
