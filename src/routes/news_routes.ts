import { AppRouter } from '../AppRouter';
import { news } from '../controllers/news';
export const newsRouter = AppRouter.getInstance();

const {
  index,
  indexAdmin,
  show,
  searchNews,
  destroy,
  requestVerification,
  requestVerificationForm,
} = news;

newsRouter.get('/search', searchNews());
newsRouter.get('/request-verification',requestVerificationForm());
newsRouter.post('/request-verification',requestVerification());
// newsRouter.get('/add_information/add', NewsController.addInformation());
newsRouter.get('/', indexAdmin());
newsRouter.get('/:id', show());
newsRouter.post('/delete/:id', destroy());
