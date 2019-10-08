import SubsTmplRepo from '../../../src/router/subscriptionTemplate/subsTmplReposiroty';
import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';
import SubsTmplMock from '../../mock/subsTmpl/subsTmplMock';
import {assert} from 'chai';

describe('SubscriptionTemplate Service Test', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Repository Method', () => {
    // describe('#deleteOne()', () => {
    //   it('SubsTmpl 삭제하기', (done) => {
    //     const SubsTmplMockName = SubsTmplMock.userInputList[0].name;
    //     SubsTmplRepo.deleteOne(SubsTmplMockName)
    //       .then((result) => {
    //         console.log(result);
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });
    // });

    describe('#saveOne()', () => {
      it('SubsTmpl 저장하기', (done) => {
        SubsTmplRepo.saveOne(SubsTmplMock)
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
        const SubsTmplMockName = SubsTmplMock.name;
        SubsTmplRepo.findByName(SubsTmplMockName)
          .then((result) => {
            console.log(result);
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
            assert.equal(8, result.length);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
