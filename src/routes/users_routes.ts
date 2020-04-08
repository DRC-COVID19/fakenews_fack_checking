import { AppRouter } from '../AppRouter';
import { UserController } from '../controllers/UserController';
export const userRouter = AppRouter.getInstance();
const { check, validationResult } = require('express-validator');

userRouter.get('/add/user', UserController.User());
userRouter.post('/add/user',
[check('userEmail').not().isEmpty(),
check('userPrenom').not().isEmpty(),
check('userName').not().isEmpty(),
check('userPseudo').not().isEmpty(),
check('userPassword').not().isEmpty()],UserController.InsertUser());
userRouter.get('/details/user', UserController.userDetails());
userRouter.get('/details/user/:userId', UserController.userDelete());
userRouter.get('/edit/user/:userId', UserController.findUser());
userRouter.post('/edit/user',
[check('userEmail').not().isEmpty(),
check('userPrenom').not().isEmpty(),
check('userName').not().isEmpty(),
check('userPseudo').not().isEmpty(),
check('userPassword').not().isEmpty()],UserController.editUser());
