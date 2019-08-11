import {Router} from 'express';
import {UserController} from '../controller/userController';

export const userRoute = Router();

userRoute.get('/', UserController.getUsers);
userRoute.post('/', UserController.addUser);
userRoute.post('/login', UserController.login);
userRoute.post('/registration', UserController.registration);