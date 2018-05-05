const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  userName: String,
});

const user = mongoose.model('telegram', userSchema);


export default user;
