const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  userName: String,
  chatId: String,

  source: { type: String, required: [true] },

});

const user = mongoose.model('subscriber', userSchema);

export default user;
