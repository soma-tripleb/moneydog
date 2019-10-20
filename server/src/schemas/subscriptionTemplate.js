import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

const membershipSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, required: true },
    channel: { type: String },
  }
);

const SubscriptionTemplateSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    name: { type: String, required: true },
    logoURI: { type: String, required: true },
    membership: membershipSchema,
  },
  {
    timestamps: true,
  }
);

SubscriptionTemplateSchema.plugin(autoIncrement, {
  model: 'SubscriptionTemplate',
  field: 'seq',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('SubscriptionTemplate', SubscriptionTemplateSchema);
