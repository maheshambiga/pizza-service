import logger from './../../utils/logger';

const getProfileController = async (req, res) => {
    logger.debug('Calling GET PROFILE endpoint with headers: %o', req.headers);

    try{
        return res.json({ statusCode: 200, message: 'User Details.', data: req.user }).status(200);
    }catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(500).json({message: err});
    }

};

export {
    getProfileController
}
