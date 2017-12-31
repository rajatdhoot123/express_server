const express = require('express')
const router = express.Router();

router.get('/',(req,res,next) => {
	res.status(200).json({
		message: 'Handling GET request to /orders'
	})
})

router.post('/',(req,res,next) => {
	const order = {
		productId: req.body.productId,
		quantity: req.body.quantity
	}
	res.status(200).json({
		message: 'Handling POST request to /orders',
		order: order
	})
})

router.get('/:orderId',(req,res,next) => {
	const id = req.params.orderId;
	if (id === 'special') {
		res.status(200).json({
			message: 'This is the request Order',
			id: id
		})	
	}
})



router.delete('/:orderId',(req,res,next) => {
	const orderId = req.params.orderId;
	res.status(200).json({
		message: `${orderId} Order Deleted`
	})
})

module.exports = router;