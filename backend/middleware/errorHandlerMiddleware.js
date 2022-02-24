const { ErrorHandler } = require("../utils/errorHandler");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  //wrong momgodb property error
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `resource not found, Invalid: ${err.path}`,
    });
  }

  // duplicate user register error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: `duplicate ${Object.keys(err.keyValue)} entered`,
    });
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    return res.status(400).json({
      success: false,
      message: `Json web token is invalid, try again!`,
    });
  }

  //jwt expiry error
  if (err.name === "TokenExpiredError") {
    return res.status(400).json({
      success: false,
      message: `Json web token is expired, try again!`,
    });
  }

  return res.status(500).json({ success: false, message: err.message });
};

module.exports = errorHandlerMiddleware;
