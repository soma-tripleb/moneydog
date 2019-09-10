const sampleDate = (() => {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
})();

const pricePlan = {
  title: 'test-name',
  price: '99999',
  period: '1달',
  channel: 'site',
};

const subscription = {
  name: 'test-title',
  price: '99999',
  paymentDate: sampleDate,
  channel: 'inapp',
  pricePlan: pricePlan,
};

const UserMock = {
  email: 'test@test.com',
  password: '1234',
  nickname: 'test-user',
  salt: '99999',
  role: 'test-role',
  subscription: subscription,
};

export default UserMock;
