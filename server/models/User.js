const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendSchema = require('./friend');
const listSchema = require('./list');
const eventSchema = require('./event');

const userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  
  login: Object,
  avatar: String,
  gender: String,

  friends: [friendSchema],
  lists: [listSchema],
  events: [eventSchema],
});

const user = mongoose.model('users', userSchema);


export default user;
