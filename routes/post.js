// all post apis 
// how to upload something 
// cloudinary

const express = require('express');
const postRouter = express.Router();
const Post = require('../models/Post');
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const sendResponse = require('../utils/response');

postRouter.post('/create', isLoggedIn, async (req, res) => {
     let{ text, image } = req.body;
     if(!text && !image){
         return sendResponse(res, false, 'Please add all the fields', null,400);
     }
     try{
        let newPost = new Post({
             text : text,
             image : image, // link of image
             user: req.user._id
        })

        let savedPost = await newPost.save();
        if(!savedPost){
            return sendResponse(res, false, 'Post not saved', null,400);
        }
        return sendResponse(res, true, 'Post saved successfully', savedPost);
     }
     catch(err){
            console.log(err);
            return sendResponse(res, false, 'Server error', null,500);
     }
})


postRouter.post("/update/:id", isLoggedIn, async (req, res) => {
     let {text, image} = req.body;

     if(!text && !image){
         return sendResponse(res, false, 'Nothing to Update', null,400);
     }

     try{
    //    let post = await Post.findOne({_id: req.params.id});
       let foundPost = await Post.findById(req.params.id);

       if(!foundPost){
           return sendResponse(res, false, 'Post not found', null,400);
       }
       
       // check if the user is the owner of the post

       let user_id = foundPost.user.toString();
       let logged_in_user_id = req.user._id.toString();
       if(user_id !== logged_in_user_id){
           return sendResponse(res, false, 'You are not authorized to update this post', null,400);
       }

       // update the post:
       if(text){
          foundPost.text = text;
       }
       if(image){
           foundPost.image = image;
       }


       const updatedPost = await foundPost.save();  // save the updated post

       if(!updatedPost){
           return sendResponse(res, false, 'Post not updated', null,400);
       }

       return sendResponse(res, true, 'Post updated successfully', updatedPost);




     }

     catch(err){
         console.log(err);
         return sendResponse(res, false, 'Server error', null,500);
     }
})

module.exports = postRouter;