const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  facebookId: String,
  password: String,
  email: String,
  name: String,
  avatar_url: String,
  custom_colors: [{ type: String }]
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };