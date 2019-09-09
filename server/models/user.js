import mongoose from 'mongoose';

const pricePlanSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    content: { type: String },
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    title: { type: String, required: true, unique: true },
    price: { type: Number },
    paymentDate: { type: Date },
    channel: { type: String },
    pricePlan: pricePlanSchema,
  }
);

const userSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String },
    role: { type: String },
    subscription: subscriptionSchema,
  },
  {
    timestamps: true, // createAt & modifiedAt
  }
);

export default mongoose.model('User', userSchema);