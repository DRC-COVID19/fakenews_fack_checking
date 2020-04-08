import { AppRouter } from '../AppRouter';
import { NewsController } from '../controllers/NewsController';
export const newsAdminRouter = AppRouter.getInstance();

//cette route dois renvoyer le formulaire de creation d'information dans la backoffice
newsAdminRouter.get('/new', NewsController.addInformation());

//Cette route mene à liste de toutes les news dans le Backoffice
newsAdminRouter.get('/', NewsController.indexAdmin());

newsAdminRouter.post('/delete/:id', NewsController.destroy());
