const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("./asyncWrapper");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @description middleware to autheticate the user
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const isAuthenticated = asyncWrapper(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      createCustomError("Please login to access this resource!", 401)
    );
  }

  const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decryptedData.id);
  next();
});

/**
 * @description check Authorization to a resource
 * @param  {} ...roles
 */
const isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createCustomError(
          `role ${req.user.role} is not authorize to access this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  isAuthorizeRoles,
};
