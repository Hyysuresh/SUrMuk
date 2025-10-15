const express = require('express');
const {
  validateCoupon,
  createCoupon,
  getAllCoupons,
  deleteCoupon
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/validate', protect, validateCoupon);
router.post('/', protect, admin, createCoupon);
router.get('/', protect, admin, getAllCoupons);
router.delete('/:id', protect, admin, deleteCoupon);

module.exports = router;
