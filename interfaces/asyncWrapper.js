const asyncWrapper = async (req, res, next) => {
  try {
    return await asyncFunction(req, res, next);
  } catch (error) {
    console.log(error);
  }
};

export default {
  asyncWrapper
};