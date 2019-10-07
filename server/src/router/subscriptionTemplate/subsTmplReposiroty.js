import SubsTmpl from '../../schemas/subscriptionTemplate';

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
