import 'babel-polyfill';
import assert from 'assert';
import SubsTmpl from '../../../src/schemas/subscriptionTemplate';
import SubsTmplRepo from '../../../src/router/subscriptionTemplate/subsTmplReposiroty';
import { mongoConnect, mongoDisConnect } from '../../../src/config/mongoDB';
import SubsTmplMock from '../../mock/subsTmpl/subsTmplMock';

describe('SubscriptionTemplate Test', () => {
  before(() => {
    mongoConnect();
  });

  after(() => {
    mongoDisConnect();
  });

  describe('Schema Method Test', () => {
    describe('#delete()', () => {
      it('테스트 전, Mock SubscriptionTemplate 제거', (done) => {
        const SubsTmplName = SubsTmplMock.name;
        SubsTmpl.deleteOne({ name: SubsTmplName }, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#create()', () => {
      it('SubsTmplMock 으로 User 생성', (done) => {
        SubsTmpl.create((SubsTmplMock), (err) => {
          if (err) done(err);
          else done();
        });
      });
    });

    describe('#find()', () => {
      it('SubscriptionTemplate name 으로 구독 서비스 검색', (done) => {
        const SubsTmplName = SubsTmplMock.name;
        SubsTmpl.findOne({ name: SubsTmplName }, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });

    describe('#modify()', () => {
      it('SubscriptionTemplate logoURI 수정', (done) => {
        const SubsTmplName = SubsTmplMock.name;
        const newLogoURI = 'test-path2';

        SubsTmpl.updateOne({ name: SubsTmplName }, { logoURI: newLogoURI }, (err) => {
          if (err) done(err);
          else done(err);
        });

        SubsTmpl.findOne({ name: SubsTmplName }, (err) => {
          if (err) err;
          else err;
        }).then((subsTmpl) => {
          assert(subsTmpl.logoRUI, newLogoURI);
        });
      });
    });

    describe('#findAll()', () => {
      it('User 전체 조회', (done) => {
        SubsTmpl.find({}, (err) => {
          if (err) done(err);
          else done(err);
        });
      });
    });
  });

  describe('Repository Method Tets', () => {
    describe('#delete', () => {
      it('SubscriptionTemlate name 으로 삭제', (done) => {
        const subsTmplName = SubsTmplMock.name;

        SubsTmplRepo.deleteOne(subsTmplName)
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#create()', () => {
      it('SubscriptionTemplate 생성', (done) => {
        SubsTmplRepo.saveOne(SubsTmplMock)
          .then((result) => {
            assert.equal(result.success, true);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('#findAll()', () => {
      it('SubscripttionTemplate 전체 조회', (done) => {
        SubsTmplRepo.findAll()
          .then((subsTmpl) => {
            done();
          }).catch((err) => {
            done(err);
          });
      });
    });
  });
});
