import SubsTmpl from '../../schemas/subscriptionTemplate';

/*
* Method Naming
* - 'Repository' 단 에서는 최대한 'mongoose' method 와 비슷하게 작성.
* : 'findOne()'에서 'name' 을 통한 검색 일 경우, 파라미터를 통해서 조건 확인 할 수 있음.
* : 추상적으로 통일 한 후에, 'Service' 단에서 구체화.
*/
const findAll = () => {
  return SubsTmpl.find()
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const findOne = (name) => {
  return SubsTmpl.findOne({ name: name })
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

const saveOne = async (subsTmpl) => {
  const createResult = await SubsTmpl.create((subsTmpl))
    .then((result) => { return result; })
    .catch((err) => { throw err; });

  return SubsTmpl.find({ name: createResult.name })
    .then((result) => {
      return { status: 201, success: true, message: result };
    })
    .catch((err) => {
      throw err;
    });
};

/**
 *
 * @param {*} name
 * @return {result} true - { n: 1, ok: 1, deletedCount: 1 }
 */
const deleteOne = (name) => {
  return SubsTmpl.deleteOne({ name: name })
    .then((result) => {
      return { status: 201, success: true, message: { object: name, result } };
    })
    .catch((err) => {
      return err;
    });
};

export default {
  findAll,
  findOne,
  saveOne,
  deleteOne,
};
