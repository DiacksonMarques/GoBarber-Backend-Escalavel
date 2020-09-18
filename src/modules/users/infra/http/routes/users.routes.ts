/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAutheticated  from '../middlewares/ensureAuthenticated';


const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAutheticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
