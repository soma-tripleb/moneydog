const sampleDate = (() => {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
})();

const Subscriptions = [
  {
    seq: 1,
    name: 'test-name1',
    price: 99999,
    paymentDate: '2019/09/26',
    channel: 'in-app',
    pricePlan: PricePlan,
  },
  {
    seq: 2,
    name: 'test-name2',
    logoURI: '22f48e58d38c794afc74a7e666ffcfc1.png',
    price: 99999,
    paymentDate: '2019/09/26',
    channel: 'in-app',
    pricePlan: PricePlan,
  },
  {
    seq: 3,
    name: 'test-name3',
    price: 99999,
    paymentDate: '2019/09/26',
    channel: 'in-app',
    pricePlan: PricePlan,
  },
];

const PricePlan = {
  title: 'test-title',
  price: '99999',
  period: '1달',
  channel: 'site',
};

const User = {
  email: 'test@test.com',
  password: '1234',
  nickname: 'test-user',
  salt: 99999,
  role: 'test-role',
  subscription: Subscriptions,
};

export default {
  User,
  PricePlan,
  Subscriptions,
};
