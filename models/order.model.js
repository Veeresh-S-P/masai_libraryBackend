const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = { OrderModel };