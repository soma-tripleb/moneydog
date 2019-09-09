const subscriptionRepository = require('./subscriptionRepository');
const appleParser = require('../../mailParser/apple/appleParser');
const googleParser = require('../../mailParser/google/googleParser');
const commonParser = require('../../mailParser/commonParser');

const getSubscriptionList = () => {
  return subscriptionRepository.getSubscriptionList();
};

const getSubscription = (response) => {
  if (commonParser.checkDomain(response) === 'apple') {
    return appleParser.getAppleInfo(response);
  }
  return googleParser.getGoolgeInfo(response);
};


module.exports = {
  getSubscriptionList: getSubscriptionList,
  getSubscription: getSubscription,

};

