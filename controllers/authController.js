import {comparePassword, hashPassword} from './../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import JWT from 'jsonwebtoken';

export const registerContreller = async (req, res) => {
  try {
    const {name, email, password, phone, address} = req.body;
    //validation
    if (!name) {
      return res.send ({message: 'name is required'});
    }
    if (!email) {
      return res.send ({message: 'email  is required'});
    }
    if (!password) {
      return res.send ({message: 'password is required'});
    }
    if (!phone) {
      return res.send ({message: 'phone is required'});
    }
    if (!address) {
      return res.send ({message: 'address is required'});
    }

    //check user
    const existingUser = await userModel.findOne ({email});

    //existing user
    if (existingUser) {
      res.status (200).send ({
        success: false,
        message: 'already register please login',
      });
    }

    //register user
    const hashedPassword = await hashPassword (password);

    //save
    const user = await new userModel ({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save ();

    res.status (201).send ({
      success: true,
      message: 'register successfuly',
      user,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      success: false,
      message: 'error in regidter',
      error,
    });
  }
};

//post login
export const loginContreller = async (req, res) => {
  try {
    const {email, password} = req.body;
    //valisation
    if (!email || !password) {
      return res.status (404).send ({
        success: false,
        message: 'invalid email or password',
      });
    }
    //check user
    const user = await userModel.findOne ({email});
    if (!user) {
      return res.status (404).send ({
        success: false,
        message: 'email is not register',
      });
    }
    const match = await comparePassword (password, user.password);
    if (!match) {
      return res.status (404).send ({
        success: false,
        message: 'invalid password',
      });
    }
    //token
    const token = await JWT.sign ({_id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status (200).send ({
      success: true,
      message: 'login successfuly',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      success: false,
      message: 'error in login',
      error,
    });
  }
};

//forgotpassword
export const forgotPasswordController = async (req, res) => {
  try {
    const {email, phone, newPassword} = req.body;
    if (!email) {
      res.status (400).send ({message: 'Email is required'});
    }
    if (!phone) {
      res.status (400).send ({message: 'Phone is required'});
    }
    if (!newPassword) {
      res.status (400).send ({message: 'Password is required'});
    }
    //check
    const user = await userModel.findOne ({email, phone});
    //validation
    if (!user) {
      return res.status (404).send ({
        success: false,
        message: 'Wrong email or phone',
      });
    }
    const hashed = await hashPassword (newPassword);
    await userModel.findByIdAndUpdate (user._id, {password: hashed});
    res.status (200).send ({
      success: true,
      message: 'Password Reset Successfuly',
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      success: false,
      message: 'Somthing went wrong',
      error,
    });
  }
};

//get test
export const testContreller = () => {
  try {
    console.log ('jwt safe');
  } catch (error) {}
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const {name, email, password, address, phone} = req.body;
    const user = await userModel.findById (req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json ({error: 'Passsword is required and 6 character long'});
    }
    const hashedPassword = password ? await hashPassword (password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate (
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      {new: true}
    );
    res.status (200).send ({
      success: true,
      message: 'Profile Updated SUccessfully',
      updatedUser,
    });
  } catch (error) {
    console.log (error);
    res.status (400).send ({
      success: false,
      message: 'Error WHile Update profile',
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find ({buyer: req.user._id})
      .populate ('products', '-photo')
      .populate ('buyer', 'name');
    res.json (orders);
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      success: false,
      message: 'Error WHile Geting Orders',
      error,
    });
  }
};