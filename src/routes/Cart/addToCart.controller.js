import httpStatus from 'http-status';
import logger from "../../utils/logger";
const addCategoryController = async (req, res) => {
    logger.debug('Calling ADD TO CART endpoint with body: %o', req.body);
    try {

    }catch (e) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export default addCategoryController;
