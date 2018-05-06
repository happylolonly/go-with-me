const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  userName: String,
  chatId: String,
});

const user = mongoose.model('fb', userSchema);


export default user;
