const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://auth:xf5RTGmZ8GGzIzLD@auth1-rectgram.apmhd.mongodb.net/")
.then(
    () => {
        console.log("Connected to the database");
    }
)
.catch(err => {
    console.log("Error connecting to the database", err);
})
