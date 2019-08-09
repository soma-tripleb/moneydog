const subscriptionRepository = require('./subscriptionRepository');

const getSubscriptionList = () => {
  return subscriptionRepository.getSubscriptionList();
}

const getSubscriptionByName = (name) => {
  return subscriptionRepository.getSubscriptionByName(name);
}

module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
}
