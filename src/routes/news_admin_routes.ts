import { AppRouter } from '../AppRouter';
import { news } from '../controllers/news';
export const newsAdminRouter = AppRouter.getInstance();

const { addInformation, indexAdmin, destroy } = news;
//cette route dois renvoyer le formulaire de creation d'information dans la backoffice
newsAdminRouter.get('/new', addInformation());

//Cette route mene à liste de toutes les news dans le Backoffice
newsAdminRouter.get('/', indexAdmin());

newsAdminRouter.post('/delete/:id', destroy());
