import SubsTmplRepository from './subsTmplReposiroty';

const getSubscriptionTemplate = (subsTmplName) => {
  return SubsTmplRepository.findByName(subsTmplName);
};

const getSubscriptionTemplateList = () => {
  return SubsTmplRepository.findAll();
};

const deleteOne = (subsTmplName) => {
  return SubsTmplRepository.deleteOne(subsTmplName);
};

const createOne = (subsTmpl) => {
  return SubsTmplRepository.saveOne(subsTmpl);
};

export default {
  getSubscriptionTemplate,
  getSubscriptionTemplateList,
  deleteOne,
  createOne,
};

