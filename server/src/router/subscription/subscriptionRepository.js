const Subscription = require('../../schemas/subscription');

const getSubscriptionList = () => {
  return Subscription.find({}, (err, subscriptions) => {
    if (err) throw err;
    // console.log(subscriptions);
  });
};

const getSubscriptionByName = (name) => {
  return Subscription.find({name: {$regex: '^' + name}}, (err, subscriptions) => {
    if (err) throw err;
  });
};

module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
};
