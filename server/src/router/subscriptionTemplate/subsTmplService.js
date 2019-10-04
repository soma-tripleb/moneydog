import SubsTmplRepository from './subsTmplReposiroty';

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

