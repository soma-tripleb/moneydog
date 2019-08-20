const subscriptionRepository = require('./subscriptionRepository');
const appleParser = require('../parser/apple/appleParser');
const googleParser = require('../parser/google/googleParser');
const commonParser = require('../parser/commonParser');

const getSubscriptionList = () => {
  return subscriptionRepository.getSubscriptionList();
}

const getSubscription = (response) => {
  if (commonParser.checkDomain(response) === 'apple') {
    return appleParser.getAppleInfo(response);
  }
  return googleParser.getGoolgeInfo(response);
}


module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscription: getSubscription,

}

