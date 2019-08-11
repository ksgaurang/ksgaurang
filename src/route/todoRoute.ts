import { Router } from 'express';
import {TodoController} from '../controller/todoController';
import { auth } from '../middleWare/auth';

export const todoRoute = Router();

todoRoute.get('/', auth, TodoController.getTodoList);
todoRoute.post('/', auth, TodoController.addTodo);
todoRoute.put('/', auth, TodoController.updateTask);