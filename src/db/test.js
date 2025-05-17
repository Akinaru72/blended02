// src/db/models/test.js

import mongoose from 'mongoose';
import { ProductsCollection } from './models/products.js';

const run = async () => {
  try {
    const id = '60d0fe4f5311236168a109ca';
    const product = await ProductsCollection.findById(id);

    console.log(product);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

run();
