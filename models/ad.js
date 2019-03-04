const mongoose = require('mongoose');

var adSchema = new mongoose.Schema({
  type: String,
  object: String,
  category: {type: Object},
  title: String,
  description: String,
  country: {type: Object},
  city: {type: Object},
  price: String,
  photo: String,
  expirationDate: Date,
  contacts: {type: Object},
  created_at: Date,
  updated_at: Date,
  notes: String,
  status: String,
  isActive: {type: Boolean, default: true},
  userId: {type: mongoose.Schema.ObjectId},
  userName: {type: Object},
  company: String,
  favorites: {type: []},
});


module.exports = mongoose.model('Ad', adSchema);