import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  content: String,
},
{
  timestamps: true,
});

UserSchema.method({});

const User = mongoose.model('User', UserSchema);

export default User;
