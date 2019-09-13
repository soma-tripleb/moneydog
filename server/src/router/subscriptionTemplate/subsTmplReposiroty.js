import SubsTmpl from '../../schemas/subscriptionTemplate';

const findAll = () => {
  return SubsTmpl.find()
    .then((result) => {
      return {status: 201, success: true, message: result};
    })
    .catch((err) => {
      const errMessage =
      {
        status: err.status,
        success: err.success,
        message: err.message,
      };
      throw errMessage;
    });
};

const findByName = (name) => {
  return SubsTmpl.findOne({ name: name })
    .then((result) => {
      return {status: 201, success: true, message: result};
    })
    .catch((err) => {
      const errMessage =
      {
        status: err.status,
        success: err.success,
        message: err.message,
      };
      throw errMessage;
    });
};

const saveOne = async (subsTmpl) => {
  const subsTmplName = subsTmpl.name;

  const createResult = await SubsTmpl.create(subsTmpl);

  const result = (createResult.name === subsTmplName) ?
    {status: 201, success: true, message: createResult} :
    'saveOne() fail';
  return result;
};

/**
 * @param {*} subsTmplName
 * @result success : { n: 1, ok: 1, deletedCount: 1 }
 */
const deleteOne = (subsTmplName) => {
  return SubsTmpl.deleteOne({ name: subsTmplName })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export default {
  findAll,
  findByName,
  saveOne,
  deleteOne,
};
