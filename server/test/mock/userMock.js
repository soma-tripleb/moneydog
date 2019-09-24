const sampleDate = (() => {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
})();

const pricePlan = {
  title: 'test-title',
  price: '99999',
  period: '1달',
  channel: 'site',
};

const subscription = {
  name: 'test-name',
  price: '99999',
  paymentDate: sampleDate,
  channel: 'inapp',
  pricePlan: pricePlan,
};

const UserMock = {
  email: 'test@test.com',
  password: '1234',
  nickname: 'test-subscription',
  salt: '99999',
  role: 'test-role',
  subscription: subscription,
};

export default UserMock;
