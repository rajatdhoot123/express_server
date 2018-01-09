const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')

const ProductController = require('../controller/products')

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads');
	},
	filename: function(req, file, cb){
		console.log(file,"file======")
		cb(null, new Date().toISOString() + file.originalname); 
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, limits: {
	fileSize: 1024 * 1024 * 5
},
	fileFilter: fileFilter
});

router.get('/',ProductController.get_all_product)

router.post('/', checkAuth, ProductController.create_new_product);

router.get('/:productId', upload.single('productImage'), ProductController.get_product_by_id);

router.patch('/:productId', checkAuth, ProductController.update_product_by_id)

router.delete('/:productId', checkAuth, ProductController.delete_product_by_id)

module.exports = router;