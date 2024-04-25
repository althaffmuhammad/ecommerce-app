import express from 'express';
import {isAdmin, requireSignIn} from './../middlewares/authMiddleware.js';
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router ();

/// router
router.post (
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController
);
//update router
router.put (
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all router
router.get ('/get-category', categoryController);

//get single cat router
router.get ('/single-category/:slug', singleCategoryController);

//delete router
router.delete (
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
