const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes which should handle request
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect("mongodb://nodeserverapp:"+ process.env.MONGO_ATLAS_PW +"@nodeserverapp-shard-00-00-vhaax.mongodb.net:27017,nodeserverapp-shard-00-01-vhaax.mongodb.net:27017,nodeserverapp-shard-00-02-vhaax.mongodb.net:27017/test?ssl=true&replicaSet=nodeServerApp-shard-0&authSource=admin",
	function(err) {
    if (err) throw err;
    else {
    	console.log("connect")
    }
}
);

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404;
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})
module.exports = app