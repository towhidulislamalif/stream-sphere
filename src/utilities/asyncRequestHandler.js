export const asyncRequestHandler = (fn) => {
  // This is the actual middleware function that will be executed for each request
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

/* const asyncRequestHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
 */
