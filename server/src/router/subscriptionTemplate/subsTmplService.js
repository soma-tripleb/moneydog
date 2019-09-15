import SubsTmplRepository from './subsTmplReposiroty';

/*
* Method Naming
* - 'Service' 단 에서는 구체적으로 명시.
* : 파라미터를 통해서 확인 할 수 있는 조건은 파라미터에 맡김.
* : 'Service' 메소드를 호출하는 객체 자체에 도메인('User', 'SubsTmpl', ...) 이 명시 되어있음을 최대한 활용.
*/
const getSubscriptionTemplateList = () => {
  return SubsTmplRepository.findAll();
};

const getSubscriptionTemplate = (name) => {
  return SubsTmplRepository.findOne(name);
};

const createOne = (subsTmpl) => {
  return SubsTmplRepository.saveOne(subsTmpl);
};

const deleteOne = (name) => {
  return SubsTmplRepository.deleteOne(name);
};

export default {
  getSubscriptionTemplateList,
  getSubscriptionTemplate,
  createOne,
  deleteOne,
};

