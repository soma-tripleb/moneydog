import mongoose from 'mongoose';

const membershipSchema = mongoose.Schema(
  {
    seq: { type: Number },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, required: true },
    channel: { type: String },
  }
);

const SubscriptionTemplateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    membership: membershipSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SubscriptionTemplate', SubscriptionTemplateSchema);
