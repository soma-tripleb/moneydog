import mongoose from 'mongoose';

const membershipSchema = mongoose.Schema({
  seq: {type: Number},
  titie: {type: String, required: true},
  price: {type: String, required: true},
  period: {type: String, required: true},
  channel: {type: String},
});

const SubscriptionTemplateSchema = mongoose.Schema({
  seq: {type: Number},
  logo: {type: String, required: true},
  title: {type: String, required: true},
  membership: membershipSchema,
});

const SubscriptionTemplate = mongoose.model('SubscriptionTemplate', SubscriptionTemplateSchema);

export default SubscriptionTemplate;
