import { AppRouter } from '../AppRouter';
import { UserController } from '../controllers/UserController';
export const userRouter = AppRouter.getInstance();

userRouter.get('/add/user', UserController.addUser());
userRouter.get('/details/user', UserController.userDetails());