import httpStatus from 'http-status';
import logger from "../../utils/logger";

const validateTokenController = async (req, res) => {
    logger.debug('Calling VALIDATE_TOKEN endpoint with token: %o', req.headers['x-access-token']);
    try {
        const {_id} = req.user;
        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Token is valid.', 'data': {
                userId: _id
            }
        });
        // return res.status(200).json({statusCode: 200, message: "Signed in.", data: {_id, firstName, token}});
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

export {
    validateTokenController
}