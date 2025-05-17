import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';

export const getProductsController = async (req, res, next) => {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createHttpError(400, 'Invalid product ID');
  }
  const product = await getProductById(productId);

  if (product === null) {
    throw new createHttpError.NotFound('Product not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const getProductByNameController = async (req, res, next) => {
  try {
    const { name } = req.params;

    const product = await getProductByName(name);

    if (product === null) {
      throw new createHttpError.NotFound(
        `Product with name "${name}" not found`,
      );
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found product with name "${name}"`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createHttpError(400, 'Invalid product ID');
  }

  const result = await updateProduct(productId, req.body);

  if (result === null) {
    throw new createHttpError.NotFound('Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result.product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);

  if (product === null) {
    throw new createHttpError.NotFound('Product not found');
  }

  res.sendStatus(204);
};
