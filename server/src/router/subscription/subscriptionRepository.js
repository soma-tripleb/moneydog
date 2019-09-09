const SubscriptionTemplate = require('../../schemas/subscriptionTemplate');

const getSubscriptionList = () => {
  return SubscriptionTemplate.find({}, (err, subscriptions) => {
    if (err) throw err;
    // console.log(subscriptions);
  });
};

const getSubscriptionByName = (name) => {
  return SubscriptionTemplate.find({name: {$regex: '^' + name}}, (err, subscriptions) => {
    if (err) throw err;
  });
};

module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
};
