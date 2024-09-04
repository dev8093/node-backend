const express = require('express');
const app = express();
const port = 5010;

// import database: 
require('./db');

// models 
 const User = require('./models/User');
 const Post = require('./models/Post');

// routes:
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})