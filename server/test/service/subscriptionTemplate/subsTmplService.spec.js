import SubsTmplRepo from '../../../src/router/subscriptionTemplate/subsTmplReposiroty';
import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';
import SubsTmplMock from '../../mock/subsTmpl/subsTmplMock';
import {assert} from 'chai';

describe('SubscriptionTemplate Service Test', () => {
  before(() => {
    mongoConnect();
    // Bugs Insert
    const bugs = SubsTmplMock.userInputList[0];
    SubsTmplRepo.saveOne(bugs);
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Repository Method', () => {
    describe('#deleteOne()', () => {
      it('Bugs 삭제하기', (done) => {
        SubsTmplRepo.deleteOne(SubsTmplMock.userInputList[0].name)
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
      it('SubsTmpl 저장하기', (done) => {
        SubsTmplRepo.saveOne(SubsTmplMock.userInputList[1])
          .then((result) => {
            console.log(result);
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
        SubsTmplRepo.findOne(SubsTmplMockName)
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
        SubsTmplRepo.findAll()
          .then((result) => {
            const list = result.message;
            assert.equal(2, list.length);
            assert.equal('Flo', list[0].name);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
