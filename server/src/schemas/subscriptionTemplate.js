import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import {conn} from '../config/mongoDB';

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

autoIncrement.initialize(conn);
SubscriptionTemplateSchema.plugin(autoIncrement.plugin, {
  model: 'SubscriptionTemplate',
  field: 'seq',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('SubscriptionTemplate', SubscriptionTemplateSchema);
