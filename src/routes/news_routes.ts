import { AppRouter } from '../AppRouter';
import { NewsController } from '../controllers/NewsController';
export const newsRouter = AppRouter.getInstance();

newsRouter.get('/search', NewsController.searchNews());
// newsRouter.get('/add_information/add', NewsController.addInformation());
newsRouter.get('/', NewsController.index());
newsRouter.get('/:id', NewsController.show());
newsRouter.post('/delete/:id', NewsController.destroy());
