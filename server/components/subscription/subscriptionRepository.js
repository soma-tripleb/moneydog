const Subscription = require('../../models/subscription');

const getSubscriptionList = () => {
  return Subscription.find({}, (err, subscriptions) => {
    if (err) throw err;
    console.log(subscriptions);
  })
};

const getSubscriptionByName = (name) => {
  return Subscription.find({ username: {$regex : "^" + name}}, (err, subscriptions) => {
    if (err) throw err;
    console.log('result : ',subscriptions);
  })
}

module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
}
