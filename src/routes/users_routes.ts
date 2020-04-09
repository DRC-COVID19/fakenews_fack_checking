import { AppRouter } from '../AppRouter';
import { users } from '../controllers/users';
export const userRouter = AppRouter.getInstance();
import { check } from 'express-validator';
const { User, InsertUser, userDetails, userDelete, findUser, editUser } = users;

userRouter.get('/add/user', User());
userRouter.post(
  '/add/user',
  [
    check('userEmail').not().isEmpty(),
    check('userPrenom').not().isEmpty(),
    check('userName').not().isEmpty(),
    check('userPseudo').not().isEmpty(),
    check('userPassword').not().isEmpty(),
  ],
  InsertUser()
);
userRouter.get('/details/user', userDetails());
userRouter.get('/details/user/:userId', userDelete());
userRouter.get('/edit/user/:userId', findUser());
userRouter.post(
  '/edit/user',
  [
    check('userEmail').not().isEmpty(),
    check('userPrenom').not().isEmpty(),
    check('userName').not().isEmpty(),
    check('userPseudo').not().isEmpty(),
    check('userPassword').not().isEmpty(),
  ],
  editUser()
);
