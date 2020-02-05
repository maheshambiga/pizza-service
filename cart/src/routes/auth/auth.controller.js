import httpStatus from 'http-status';
import {signUp, signIn} from './../../services/auth';
import logger from './../../utils/logger';

const singUpController = async (req, res) => {
    logger.debug('Calling SIGN-UP endpoint with body: %o', req.body);
    try {
        const userStatus = await signUp(req.body);
        return res.status(userStatus.statusCode).json(userStatus);
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};

const singInController = async (req, res) => {
    logger.debug('Calling SIGN-IN endpoint with body: %o', req.body);
    try {
        const {email, password} = req.body;
        const {token, userId} = await signIn(email, password);

        res.setHeader('x-access-token', token);
        res.status(httpStatus.OK).json({
            'statusCode': httpStatus.OK, 'message': 'Token generated.', 'data': {
                userId
            }
        });
        // return res.status(200).json({statusCode: 200, message: "Signed in.", data: {_id, firstName, token}});
    } catch (err) {
        logger.error('🔥 error: %o', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err});
    }
};


export {
    singUpController,
    singInController
}
