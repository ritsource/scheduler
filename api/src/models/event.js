const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  hex_color: { type: String, default: '#36A500' },
  date_from: { type: Number, default: new Date().setHours(0,0,0,0).valueOf() },
  date_to: { type: Number, default: new Date().setHours(0,0,0,0).valueOf() },
  notification: { type: Boolean, default: false },
  _group: { type: Schema.Types.ObjectId, ref: 'Group' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' },
  _isDeleted: { type: Boolean, default: false },
  _isDone: { type: Boolean, default: false },
  _rank: { type: Number, required: true },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };