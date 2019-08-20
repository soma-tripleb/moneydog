const subscriptionRepository = require('./subscriptionRepository');
const appleParser = require('../parser/apple/appleParser');
const googleParser = require('../parser/google/googleParser');

const getSubscriptionList = () => {
  return subscriptionRepository.getSubscriptionList();
}

const getSubscriptionByName = (name) => {
  return subscriptionRepository.getSubscriptionByName(name);
}

const checkDomain = (response) => {

}


module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscriptionByName: getSubscriptionByName,
}

