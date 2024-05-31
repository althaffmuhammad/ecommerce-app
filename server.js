import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routs/authRout.js';
import categoryRout from './routs/categoryRouts.js';
import productRoutes from './routs/productRoutes.js';
import 'colors';
import cors from 'cors';
import path from 'path';

//config .env
dotenv.config ();

//port
const PORT = process.env.PORT || 3030;

const __dirname = path.resolve ();

//database config
connectDB ();

//res object
const app = express ();

//middleware
app.use (cors ());
app.use (express.json ());
app.use (morgan ('dev'));
app.use (express.static (path.join (__dirname, './client/build')));

//rout
app.use ('/api/v1/auth', authRoutes);
app.use ('/api/v1/category', categoryRout);
app.use ('/api/v1/product', productRoutes);

//rest api
app.use ('*', (req, res) => {
  res.sendFile (path.join (__dirname, './client/build/index.html'));
});

//rum listen
app.listen (PORT, () => {
  console.log (`Server Running On ${PORT}`.bgGreen.black);
});
