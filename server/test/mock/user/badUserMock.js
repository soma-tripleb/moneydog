const sampleDate = (() => {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
})();

const Subscriptions = [
  {
    seq: 1,
    name: 'test-name1',
    // price: 99999,
    paymentDate: '2019/09/26',
    channel: 'in-app',
    pricePlan: PricePlan,
  },
  {
    seq: 2,
    name: 'test-name2',
    price: 99999,
    // paymentDate: '2019/09/26',
    channel: 'in-app',
    pricePlan: PricePlan,
  },
  {
    seq: 3,
    name: 'test-name3',
    price: 99999,
    paymentDate: '2019/09/26',
    channel: 'inapp', // 'in-app'
    pricePlan: PricePlan,
  },
];

const PricePlan = {
  title: 'test-title',
  price: '99999',
  period: '1달',
  channel: 'site',
};

const Subscription = {
  seq: 1,
  name: 'test-name',
  price: '', // not null
  paymentDate: '2019/09/26',
  channel: 'in-app',
  pricePlan: PricePlan,
};

const UserMock = {
  email: 'test@test.com',
  password: '1234',
  nickname: 'test-user',
  salt: 99999,
  role: 'test-role',
  subscription: Subscription,
};

export default {
  UserMock,
  Subscription,
  PricePlan,
  Subscriptions,
};
