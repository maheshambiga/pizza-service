import httpStatus from 'http-status';
import logger from "../../utils/logger";

const getCartController = async (req, res) => {
    logger.debug('Calling GET CART endpoint with body: %o', req.body);
    try {

        const userId = req.user._id.toString();

        req.redisClient.HGETALL(`u:${userId}`, (err, reply) => {

            if (err) {
                logger.error('🔥 error: %o', err);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
            }
            let items = [];

            if(reply){
                Object.keys(reply).forEach((key) => {
                    console.log(reply[key]);
                    items.push(JSON.parse(reply[key]));
                });
            }

            res.status(200).json({
                'statusCode': 200, 'message': 'cart items.', 'data': {
                    total: items.length,
                    items
                }
            });

        });


    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err });
    }
};

export default getCartController;
