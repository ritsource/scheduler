const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  title: String,
  hex_color: { type: String, default: '#4286f4' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _isDeleted: { type: Boolean, default: false },
  _isPermanent: { type: Boolean, default: false },
  _isOnCalendar: { type: Boolean, default: true },
  _rank: { type: Number, required: true }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group };