const errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  debugger;
  return res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};

const throwErrorWithStatus = (code, mes, res, next) => {
  const error = new Error(mes);
  res.status(code);
  debugger;
  next(error);
};

const badRequestException = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

module.exports = {
  errHandler,
  throwErrorWithStatus,
  badRequestException,
};
