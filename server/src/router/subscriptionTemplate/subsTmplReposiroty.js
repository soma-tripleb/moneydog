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

  return SubsTmpl.create(subsTmpl)
    .then(() => {
      return 'success';
    })
    .catch((err) => {
      throw err;
    });
  /*
  const result = await SubsTmpl.create(subsTmpl, (err) => {
    if (err) return err.status;
    return 'success';
  });

  return result;
  */
  /*
  return SubsTmpl.create(subsTmpl)
    .then(() => {
      return findByName(subsTmplName).then((result) => {
        return result;
      }).catch((err) => {
        throw (err);
      });
    })
    .catch((err) => {
      throw err;
    });
    */
};


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
