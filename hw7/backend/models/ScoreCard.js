import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  subject: String,
  score: String
});

const User = mongoose.model('User', UserSchema);

export default User;