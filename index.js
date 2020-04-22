const express= require('express');
const app=express();
const dotenv= require('dotenv');
const mongoose=require('mongoose');

//Import routes
const authRoute = require('./routes/auth');

dotenv.config();


//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true },
()=> console.log('connect to db')
);

//Middlewares
app.use(express.json());

//Routes Middlewares
app.use('/api/user',authRoute);

app.listen(3000, () => console.log('server running'));