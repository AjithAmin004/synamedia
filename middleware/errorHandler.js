const { constants } = require("../config/constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        statckTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        statckTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "User Not AUTHORIZED",
        message: err.message,
        statckTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        statckTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        statckTrace: err.stack,
      });
      break;
    default:
      res.status(400).json({
        title: "Mongoose error",
        message: err.message,
        statckTrace: err.stack,
      })
      break;
  }
};

module.exports = errorHandler;
