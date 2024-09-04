
const express = require('express');
const authRouter =  express.Router()

const User =  require('../models/User');

const bcrypt = require("bcrypt");
const { v4:uuid4 } = require('uuid'); 
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const sendResponse = require('../utils/response');





authRouter.post('/signup', async (req, res) => {
   const { name, email, password } = req.body;
 
   // Check if all fields are filled
   if (!name || !email || !password) {
     return sendResponse(res, false, 'Please add all the fields', null,400);
   }
 
   try {
     // Check if user email already exists in database
     const existingUser = await User.findOne({ email });
 
     if (existingUser) {
       return sendResponse(res, false, 'User already exists with that email', null, 400);
     }
 
     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create a new user
     let newUser = new User({
       name,
       email,
       password: hashedPassword
     });
 
     // Save the new user
     let savedUser = await newUser.save();
 
     if (!savedUser) {
       return sendResponse(res, false, 'User not saved', null,400);
     }
 
     // Generate token
     let token = uuid4();
     savedUser.token = token;
     await savedUser.save();
 
     return sendResponse(res, true, 'User saved successfully', savedUser);
 
   } catch (err) {
     console.log(err);
     return sendResponse(res, false, 'Server error', null,500);
   }
 });


 authRouter.post('/login', async (req, res) => {
   const { email, password } = req.body;
 
   if (!email || !password) {
     return sendResponse(res, false, 'Please add all the fields', null,400);
   }
 
   try {
     const foundUser = await User.findOne({ email });
 
     if (!foundUser) {
       return sendResponse(res, false, 'User not found', null,400);
     }
 
     const isMatch = await bcrypt.compare(password, foundUser.password);
 
     if (!isMatch) {
       return sendResponse(res, false, 'Invalid password', null,400);
     }
 
     // Generate token
     let token = uuid4();
     foundUser.token = token;
     await foundUser.save();
 
     return sendResponse(res, true, 'User logged in successfully', foundUser);
 
   } catch (err) {
     console.log('Issue while searching email in database', err);
     return sendResponse(res, false, 'Server error', null, 500);
   }
 });




authRouter.delete('/logout', isLoggedIn, async (req, res) => {
   try {
     req.user.token = null;
     const savedUser = await req.user.save();
 
     return sendResponse(res, true, 'User logged out successfully', savedUser);
   } catch (err) {
     console.log('Logout Failed', err);
     return sendResponse(res, false, 'Logout Failed', null, 500);
   }
 });






module.exports = authRouter;

