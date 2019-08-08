const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  content: String,
});

UserSchema.method({});

const User = mongoose.model('User', UserSchema);

module.exports = User;
