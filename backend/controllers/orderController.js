const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (paymentMethod === 'razorpay') {
      const razorpay = getRazorpayInstance();
      const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `order_${Date.now()}`
      };

      const razorpayOrder = await razorpay.orders.create(options);

      const order = await Order.create({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        paymentInfo: { orderId: razorpayOrder.id }
      });

      res.status(201).json({ 
        order, 
        razorpayOrder,
        razorpayKey: process.env.RAZORPAY_KEY_ID 
      });
    } else {
      const order = await Order.create({
        user: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        orderStatus: 'confirmed'
      });

      res.status(201).json(order);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, orderDbId } = req.body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new Error('Razorpay secret not configured');
    }

    const sign = orderId + '|' + paymentId;
    const expectedSign = crypto
      .createHmac('sha256', keySecret)
      .update(sign.toString())
      .digest('hex');

    if (signature === expectedSign) {
      const order = await Order.findByIdAndUpdate(
        orderDbId,
        {
          'paymentInfo.paymentId': paymentId,
          'paymentInfo.signature': signature,
          orderStatus: 'confirmed'
        },
        { new: true }
      );

      res.json({ success: true, order });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
