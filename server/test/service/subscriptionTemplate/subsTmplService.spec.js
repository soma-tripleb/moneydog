import SubsTmplRepo from '../../../src/router/subscriptionTemplate/subsTmplReposiroty';
import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';
import SubsTmplMock from '../../mock/subsTmpl/subsTmplMock';
import {assert} from 'chai';

describe('SubscriptionTemplate Service Test', () => {
  before(() => {
    console.log('before connection');
    mongoConnect();
    console.log('after connection');
  });

  after(() => {
    console.log('before disconnect');
    mongoDisConnect();
    console.log('after disconnect');
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

    // describe('#saveOne()', () => {
    //   it('SubsTmpl 저장하기', (done) => {
    //     console.log('save db');
    //     SubsTmplRepo.saveOne(SubsTmplMock.userInputList[0])
    //       .then((result) => {
    //         console.log(result);
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });
    // });
    //
    // describe('findOne()', () => {
    //   it('SubsTmpl 이름으로 구독 서비스 정보 찾기', (done) => {
    //     const SubsTmplMockName = SubsTmplMock.userInputList[0].name;
    //     SubsTmplRepo.findByName(SubsTmplMockName)
    //       .then((result) => {
    //         console.log(result);
    //         done();
    //       })
    //       .catch((err) => {
    //         done(err);
    //       });
    //   });
    // });

    describe('findAll()', () => {
      it('SubsTmpl 전체 구독 서비스 목록 출력', (done) => {
        SubsTmplRepo.findAll()
          .then((result) => {
            const list = result.message;
            assert.equal(8, list.length);
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
