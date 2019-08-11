import { Router } from 'express';
import { ProductController } from '../controller/productController';

export const productRoute = Router();

productRoute.get('/', ProductController.getProducts);