// src/routers/products.js
import express, { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  getProductByNameController,
  createProductController,
  patchProductController,
  deleteProductController,
} from '../controllers/products.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const productsRouter = Router();

const jsonParser = express.json();

productsRouter.get('/', ctrlWrapper(getProductsController));

productsRouter.get('/name/:name', ctrlWrapper(getProductByNameController));

productsRouter.get('/:productId', ctrlWrapper(getProductByIdController));

productsRouter.post('/', jsonParser, ctrlWrapper(createProductController));

productsRouter.patch(
  '/:productId',
  jsonParser,
  ctrlWrapper(patchProductController),
);

productsRouter.delete('/:productId', ctrlWrapper(deleteProductController));

export default productsRouter;
