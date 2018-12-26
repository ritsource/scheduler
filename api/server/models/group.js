const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  title: String,
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _isDeleted: { type: Boolean, default: false },
  _isPermanent: { type: Boolean, default: false },
  _rank: { type: Number, required: true }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group };