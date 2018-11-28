const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  hex_color: String,
  date_from: Number,
  date_to: Number,
  steps: [{ type: Schema.Types.ObjectId, ref: 'Steps' }],
  notification: { type: Boolean, default: false },
  _group: { type: Schema.Types.ObjectId, ref: 'Group' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _isDeleted: { type: Boolean, default: false },
  _isDone: { type: Boolean, default: false }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };