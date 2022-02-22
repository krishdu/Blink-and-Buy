const User = require("../models/userModel");
const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const saveToken = require("../utils/generateSaveTokenInCookie");
const sendEmail = require("../utils/sendEmail");

/**
 * @param  {} req
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

/**
 * @description login user and save cookie
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
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

/**
 * @description logout user, clear cookie
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const logoutUser = asyncWrapper(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    htmlOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

const forgotPassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createCustomError(`${req.body.email} is not registered`, 404));
  }

  //get resetPasswordToken
  const resetToken = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password token is :- \n\n ${resetPasswordURL} \n\n If you have not request this please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Blink&Buy Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(createCustomError(error.message, 500));
  }
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
};
