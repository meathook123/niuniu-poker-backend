const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  openid: String,
  nickName: String,
  avatarUrl: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
