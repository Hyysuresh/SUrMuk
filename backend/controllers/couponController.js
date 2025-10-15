const Coupon = require('../models/Coupon');

exports.validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(), 
      isActive: true,
      expiryDate: { $gt: new Date() }
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired coupon' });
    }

    res.json({ discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
