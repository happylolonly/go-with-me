const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = require('./friend');
const listSchema = require('./list');
const eventSchema = require('./event');

const userSchema = new Schema({
  id: String,
  friends: [friendSchema],
  lists: [listSchema],
  events: [eventSchema],
  name: String,
  login: Object,
});

const user = mongoose.model('users', userSchema);


export default user;