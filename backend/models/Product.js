const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'accessories', 'clothing', 'home-decor', 'health-care', 'makeup', 'others']
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
