import { AppRouter } from '../AppRouter';
import { NewsController } from '../controllers/NewsController';
export const newRouter = AppRouter.getInstance();

newRouter.post('/info/search', NewsController.informationSearch());
newRouter.get('/add_information/add', NewsController.addInformation());
newRouter.get('/all-information',NewsController.displayAllInformation());
newRouter.get('/form-check-info', NewsController.addInfo());
newRouter.get('/', NewsController.home());
newRouter.get('/:id', NewsController.show());
newRouter.get('/delete/:informationId', NewsController.deleteInformation());
