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
    seq: { type: Number },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    membership: membershipSchema,
  },
  {
    timestamps: true,
  }
);

const SubscriptionTemplate = mongoose.model('SubscriptionTemplate', SubscriptionTemplateSchema);

export default SubscriptionTemplate;
