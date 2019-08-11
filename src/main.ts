import bodyParser from 'body-parser';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { productRoute } from './route/productRoute';
import { todoRoute } from './route/todoRoute';
import { userRoute } from './route/userRoute';
import { config } from 'dotenv';
import { createLogger, transports } from 'winston';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
config();

app.use(helmet());
app.use(compression());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-Access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');

    next();
});


const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'server-log' })
    ]
});

// urlencoded means formdata in javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.log({
        level: 'info',
        message: JSON.stringify(req.body)
    });

    next();
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json('Get Call');
});


app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/todo', todoRoute);

mongoose.connect(process.env.DB || '',
    { useNewUrlParser: true }).then(() => {
        app.listen(process.env.PORT || 4201, () => {
            console.log('Server started on 4201');
        });
    });
