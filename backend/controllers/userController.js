const User = require("../models/userModel");
const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const saveToken = require("../utils/generateSaveTokenInCookie");

/**
 * @param  {} async
 * @param  {} res
 * @param  {} next
 * @returns jwt TOEKN
 */
const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "demo id",
      url: "demo url",
    },
  });

  saveToken(user, 201, res);
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createCustomError("Please enter your email and password!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(createCustomError("Invalid email or Password!", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(createCustomError("Invalid email or Password!", 401));
  }

  saveToken(user, 200, res);
});

module.exports = {
  registerUser,
  loginUser,
};
