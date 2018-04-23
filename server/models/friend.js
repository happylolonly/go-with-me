const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  // date: { type: Number, required: [true] },
  // message: { type: String, required: [true] },
  name: String,
  link: String,
  source: String,
});;

// const Feedback = mongoose.model('friend', FeedbackSchema);

module.exports = FeedbackSchema;
