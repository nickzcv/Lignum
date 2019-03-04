const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  lastName: String,
  name: String,
  middleName: String,
  country: {type: Object},
  city: {type: Object},
  work: String,
  position: String,
  photo: String,
  phone1: String,
  phone2: String,
  created_at: Date,
  updated_at: Date,
  notes: String,
  status: String,
  isActive: {type: Boolean, default: true}
});

// Check password (not secure)
userSchema.methods.validPassword = function(password) {
  return this.password === password;
};

// generate the JWT
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


module.exports = mongoose.model('User', userSchema);