import DateUtil from '../../util/dateUtil';

const NOW = DateUtil.NOW();

const TEST_USER_SELECTED_SUBS = [
  {
    logo: undefined,
    name: 'Bugs',
    seq: 4,
  },
  {
    logo: '53034c07a6a95b5c4d8f1bdaa97383d9.png',
    name: 'Flo',
    seq: 5,
  },
  {
    logo: 'b5dd21c4668e2e0284ec5a1e4d9967ce.png',
    name: 'Melon',
    seq: 6,
  },
];

const TEST_USER_SUBSTMPL_INFO_LIST = [
  {
    seq: 4,
    name: 'Bugs',
    price: '',
    paymentDate: `${NOW}`,
    channel: '',
  },
  {
    seq: 5,
    name: 'Flo',
    price: '',
    paymentDate: `${NOW}`,
    channel: '',
  },
  {
    seq: 6,
    name: 'Melon',
    price: '',
    paymentDate: `${NOW}`,
    channel: '',
  }
];

export {
  TEST_USER_SELECTED_SUBS,
  TEST_USER_SUBSTMPL_INFO_LIST,
};
