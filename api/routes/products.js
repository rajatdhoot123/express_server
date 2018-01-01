const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/',(req, res, next) => {
	Product.find()
	.select('name price _id')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			products: docs.map(docs => {
				return {
					name: docs.name,
					price: docs.price,
					_id: docs._id,
					request: {
						type: "GET",
						url: 'http://localhost:5050/products/'+docs._id
					}
				}
			})
		};
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
})

router.post('/', (req, res, next) => {
	console.log("in Post")
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product Successfully",
        createdProduct: {
        	name: result.name,
        	price: result.price,
        	_id: result.id,
        	request: {
        		type: "GET",
        		url: 'http://localhost:5050/products/'+result._id
        	}
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:productId',(req,res,next) => {
	const id = req.params.productId;
	Product.findById(id)
		.select('name price _id')
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						type: "GET",
						description: "GET_ALL_PRODUCT",
						url:'http://localhost:5050/products'
					}
				});
			} else {
				res.status(200).json({message: 'No valid Entry found for Provided Id'});
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({error: err})
		})
})

router.patch('/:productId',(req,res,next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Product Updated",
			request: {
				type: "GET",
				url: 'http://localhost:5050/products/'+id
			}
		});
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({
			error: err
		})
	});
})

router.delete('/:productId',(req,res,next) => {
	const id = req.params.productId
	Product.remove({_id: id})
	.exec()
	.then(result => {
		res.status(500).json({
			message: 'Product Deleted',
			request: {
				type: 'POST',
				url: 'http://localhost:5050/products/',
				data: { name: "String" , price: "Number"}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		})
	})
})

module.exports = router;