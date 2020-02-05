import httpStatus from 'http-status';
import CategoryModel from './../../mongo/models/category.model';
import logger from "../../utils/logger";

const addCategoryController = async (req, res) => {
    logger.debug('Calling ADD CATEGORY endpoint with body: %o', req.body);
    try {
        const {name} = req.body;
        const crust = new CategoryModel();
        crust.set('name', name);
        const crustObj = await crust.save();

        res.status(200).json({
            'statusCode': 200, 'message': 'Category got added.', 'data': {
                ...crustObj.toObject()
            }
        });
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default addCategoryController;
