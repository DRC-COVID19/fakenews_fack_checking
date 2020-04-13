import { AppRouter } from '../../app.router';
import NewsController from './news.controller';
import express from 'express';
// export const newsAdminRouter = AppRouter.getInstance();
export const newsRouter = express.Router();

const {
  index,
  show,
  requestVerification,
  requestVerificationForm,
} = NewsController;

newsRouter.get('/', index);
newsRouter.get('/request-verification', requestVerificationForm);
newsRouter.post('/request-verification', requestVerification);
newsRouter.get('/:id', show);
