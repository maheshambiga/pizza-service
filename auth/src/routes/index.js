import { Router } from 'express';
import route from './controller/route';

export default () => {
    const router = Router();
    route(router);
    return router;
}
