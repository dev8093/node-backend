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

// cors: 
const cors = require('cors')

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);



app.get('/', (req, res) => {
  res.send('Hello World');
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})