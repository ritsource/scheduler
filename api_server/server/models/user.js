const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  facebookId: String,
  email: { type: String, required: true },
  name: String
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };