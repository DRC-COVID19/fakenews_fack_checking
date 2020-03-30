import { AppRouter } from '../AppRouter';
import { Request, Response } from 'express';
import { NewsController } from '../controllers/NewsController';

export const newRouter = AppRouter.getInstance();

newRouter.get('/', NewsController.home());
newRouter.get('/:id', NewsController.show());
