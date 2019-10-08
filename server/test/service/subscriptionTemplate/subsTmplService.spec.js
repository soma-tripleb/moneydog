import SubsTmplService from '../../../src/router/subscriptionTemplate/subsTmplService';
import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';
import SubsTmplMock from '../../mock/subsTmpl/subsTmplMock';
import {assert} from 'chai';

describe('SubscriptionTemplate Service Test', () => {
  before(() => {
    mongoConnect();
    // Bugs Insert
    const bugs = SubsTmplMock.userInputList[0];
    SubsTmplService.createOne(bugs);
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Repository Method', () => {
    describe('#deleteOne()', () => {
      it('Bugs 삭제하기', (done) => {
        SubsTmplService.deleteOne(SubsTmplMock.userInputList[0].name)
          .then((result) => {
            assert.equal(201, result.status);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#saveOne()', () => {
      it('SubsTmpl FLo 저장하기', (done) => {
        SubsTmplService.createOne(SubsTmplMock.userInputList[1])
          .then((result) => {
            assert.equal(201, result.status);
            assert.equal(result.message[0].name, 'Flo');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
    describe('findOne()', () => {
      it('SubsTmpl 이름으로 구독 서비스 정보 찾기', (done) => {
        const SubsTmplMockName = SubsTmplMock.userInputList[0].name;
        SubsTmplService.getSubscriptionTemplate(SubsTmplMockName)
          .then((result) => {
            assert('Bugs', result.message.name);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('findAll()', () => {
      it('SubsTmpl 전체 구독 서비스 목록 출력', (done) => {
        SubsTmplService.getSubscriptionTemplateList()
          .then((result) => {
            const list = result.message;
            assert.equal(2, list.length);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
