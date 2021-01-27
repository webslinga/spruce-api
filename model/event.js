const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let event = new Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  featured: Boolean,
  type: String,
  description: String
});

module.exports = mongoose.model('Event', event);
