const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  hex_color: String,
  date_from: Number,
  date_to: Number,
  notification: { type: Boolean, default: false },
  _group: { type: Schema.Types.ObjectId, ref: 'Group' },
  _creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };