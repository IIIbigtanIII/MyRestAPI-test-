const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://bigtan:'+process.env.MONGO_ATLAS_PW 
+'@mydb-bazhe.mongodb.net/test?retryWrites=true',{
useNewUrlParser: true,
});

//show log method option(log server) in terminal
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Routes which should handle requests
app.use('/orders',orderRoutes);
app.use('/products',productRoutes);
app.use('/users',userRoutes);

app.use((req,res,next)=>{
    const error =new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;



