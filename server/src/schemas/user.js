import mongoose from 'mongoose';
import autoInceement from 'mongoose-auto-increment';
import {conn} from '../dbConfig/mongoDB';

const pricePlanSchema = new mongoose.Schema(
  {
    title: {type: String},
    price: {type: Number},
    content: {type: String},
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    seq: {type: Number},
    name: {type: String, required: true, unique: true},
    price: {type: Number},
    paymentDate: {type: Date},
    channel: {type: String},
    pricePlan: pricePlanSchema,
  }
);

const userSchema = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    salt: {type: Number, required: true},
    role: {type: String, required: true},
    subscription: subscriptionSchema,
  },
  {
    timestamps: true, // createAt & modifiedAt
  }
);

autoInceement.initialize(conn);
userSchema.plugin(autoInceement.plugin, {
  model: 'User',
  field: 'seq',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('User', userSchema);
