const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const sendResponse = require('../utils/response');


const isLoggedIn = async (req, res, next) => {
    let token = req.headers.authorization;
     console.log("token",token);
    if (!token) {
      return sendResponse(res, false, 'You must be logged in', null,400);
    }
  
  
    try {
      const foundUser = await User.findOne({ token });
  
      if (!foundUser) {
        return sendResponse(res, false, 'User not found', null,400);
      }
  
      req.user = foundUser;
      next();
    } catch (err) {
      console.log('Token is invalid', err);
      return sendResponse(res, false, 'Token is invalid', null, 400);
    }
  };

module.exports = isLoggedIn;