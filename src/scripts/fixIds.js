import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ProductsCollection } from '../db/models/products.js';
import { ObjectId } from 'mongodb';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

async function fixIds() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const collection = ProductsCollection.collection;

    const cursor = collection.find({ _id: { $type: 'string' } });

    for await (const doc of cursor) {
      const oldId = doc._id;
      const newId = new ObjectId(oldId);

      const { _id, ...rest } = doc;

      await collection.insertOne({ _id: newId, ...rest });

      await collection.deleteOne({ _id: oldId });

      console.log(`🔁 Converted _id from string to ObjectId: ${oldId}`);
    }

    console.log('✅ Conversion complete.');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

fixIds();
