import { AppRouter } from '../AppRouter';
import { InformationsController } from '../controllers/InformationsController';
export const informationRouter = AppRouter.getInstance();

informationRouter.get('/details',InformationsController.informationDetail());

// import { AppRouter } from '../AppRouter';
// import { Request, Response } from 'express';
// import { index, show } from '../controllers/InformationsController';

// export const newRouter = AppRouter.getInstance();

// newRouter.get('/', index);
// newRouter.get('/:id', show);
