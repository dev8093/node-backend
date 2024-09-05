const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  // isDeleted: boolean,
  // user_id :{
  //   type: String,
  // }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
