import { AppRouter } from '../AppRouter';
import { UserController } from '../controllers/UserController';
export const userRouter = AppRouter.getInstance();

userRouter.get('/add/user', UserController.User());
userRouter.post('/add/user', UserController.InsertUser());
userRouter.get('/details/user', UserController.userDetails());
userRouter.get('/details/user/:userId', UserController.userDelete());
userRouter.get('/edit/user/:userId', UserController.findUser());
userRouter.post('/edit/user', UserController.editUser());
