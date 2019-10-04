import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { conn } from '../config/mongoDB';

const pricePlanSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    title: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String, required: true },
    channel: { type: String },
  },
  {
    timestamps: true,
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    seq: { type: Number, required: true },
    name: { type: String, unique: true },
    logo: { type: String, required: true },
    price: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    channel: {
      type: String,
      enum: ['in-app', 'site'],
      required: true,
    },
    pricePlan: pricePlanSchema,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true },
    salt: { type: Number, required: true },
    role: { type: String, required: true },
    access_token: { type: String },
    refresh_token: { type: String },
    subscription: [subscriptionSchema],
  },
  {
    timestamps: true, // createAt & modifiedAt
  }
);

autoIncrement.initialize(conn);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'seq',
  startAt: 1,
  incrementBy: 1,
});

const User = mongoose.model('User', userSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);
const PricePlan = mongoose.model('PricePlan', pricePlanSchema);

export default {
  User,
  Subscription,
  PricePlan,
};
