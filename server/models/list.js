const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  title: String,
  friends: Array,
});;

// const Feedback = mongoose.model('list', FeedbackSchema);

module.exports = FeedbackSchema;
