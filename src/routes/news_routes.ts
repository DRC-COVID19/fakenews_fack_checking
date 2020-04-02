import { AppRouter } from '../AppRouter';
import { NewsController } from '../controllers/NewsController';

export const newRouter = AppRouter.getInstance();

newRouter.get('/form-check-info', NewsController.addInfo());
newRouter.get('/', NewsController.home());
newRouter.get('/:id', NewsController.show());
