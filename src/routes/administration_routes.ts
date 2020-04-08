import { AppRouter } from '../AppRouter';
import { AdministrationController } from '../controllers/AdministrationController';
export const administrationRouter = AppRouter.getInstance();

administrationRouter.get('/admin/login', AdministrationController.showLoginForm());
administrationRouter.get('/admin/home', AdministrationController.home());

