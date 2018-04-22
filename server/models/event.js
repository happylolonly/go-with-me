const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  link: String,
  list: String,
  description: String,
});

// const Event = mongoose.model('event', EventSchema);

module.exports = EventSchema;

// EventSchema.virtual('eventsCount').get(function() {
//   return this.posts.length;
// });

// validate: {
//   validator: (name) => name.length > 2,
//   message: 'Name must be longer than 2 characters.'
// },
