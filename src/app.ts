import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiRouter from './routes/api';
import indexRouter from './routes/index';
import swaggerDocument from '../public/swagger.json';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const options = {
  swaggerOptions: {
    tryItOutEnabled: true,
  },
};
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/api', apiRouter);

export default app;
