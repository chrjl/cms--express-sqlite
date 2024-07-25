import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiRouter from './routes/api';
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
app.use('/api', apiRouter);
app.get('/', (req, res) => res.redirect('/public/index.html'));

export default app;
