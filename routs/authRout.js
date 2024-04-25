import express from 'express';
import {
  registerContreller,
  loginContreller,
  testContreller,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
} from '../controllers/authController.js';
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js';

//rout object
const router = express.Router ();

//rehister
router.post ('/register', registerContreller);

//login
router.post ('/login', loginContreller);

//forgot password controler
router.post ('/forgot-password', forgotPasswordController);

//test rout
router.get ('/test', requireSignIn, isAdmin, testContreller);

//protecting user router
router.get ('/user-auth', requireSignIn, (req, res) => {
  res.status (200).send ({ok: true});
});
//protecting admin router
router.get ('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status (200).send ({ok: true});
});

//update profile
router.put ('/profile', requireSignIn, updateProfileController);

//orders
router.get ('/orders', requireSignIn, getOrdersController);

export default router;
