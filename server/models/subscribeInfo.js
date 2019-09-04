import mongoose from 'mongoose';

// Define Schemes
const subscribeInfoSchema = new mongoose.Schema({
  userId: {type: Number, required: true},
  serviceName: {type: String, required: true},
  paymentDay: {type: Number, required: true},
  price: {type: Number, required: true},
  currencyUnit: {type: String, required: true},
  paymentPeriod: {type: String, required: true},
},
{
  timestamps: true,
});

// Create Model & Export
const subscribeInfo = mongoose.model('SubscribeInfo', subscribeInfoSchema);
export default subscribeInfo;
