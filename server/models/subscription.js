const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
  id: String,
  name: String,
  date: String,
  duration: String,
  renewal: String
});

SubscriptionSchema.method({});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
