import express from 'express';
import articlesRoutes from './routes/articles';
import authRoutes from './routes/auth';
import subsRoutes from './routes/subs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('CONNECTED TO MONGODB!');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use('/auth', authRoutes);
    app.use('/subs', subsRoutes);
    app.use('/articles', articlesRoutes);

    app.listen(8080, () => {
      console.log(`🚀 NOW LISTENING TO PORT 8080!`);
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });