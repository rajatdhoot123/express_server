const express = require('express')
const router = express.Router();

router.get('/',(req,res,next) => {
	res.status(200).json({
		message: 'Handling GET request to /products'
	})
})

router.post('/',(req,res,next) => {
	res.status(200).json({
		message: 'Handling POST request to /products'
	})
})

router.get('/:productId',(req,res,next) => {
	const id = req.params.productId;
	if (id === 'special') {
		res.status(200).json({
			message: 'You deserve a special id',
			id: id
		})	
	}
	else {
		res.status(200).json({
			message: 'You passed an Id',
			id: id
		})		
	}
})

router.patch('/',(req,res,next) => {
	res.status(200).json({
		message: 'products Updated'
	})
})

router.delete('/',(req,res,next) => {
	res.status(200).json({
		message: 'Product Deleted'
	})
})

module.exports = router;