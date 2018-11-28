const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  title: String,
  _creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group };