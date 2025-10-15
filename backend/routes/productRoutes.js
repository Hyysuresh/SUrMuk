const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, upload.array('images', 5), createProduct);
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;