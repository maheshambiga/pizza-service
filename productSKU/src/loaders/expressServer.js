import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';
import config from './../utils/config';
import routes from './../routes/index';


export default (app)=> {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.enable('trust proxy');

    app.use(cors(config.corsOptions));

    app.use(require('method-override')());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    app.use(helmet());
    /*TODO - implment CRURF*/
    // app.use(csrf());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // TODO - rate limiter
    // app.use(ratelimiter);

    app.use(config.api.prefix, routes());

    app.use(errors());

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}

