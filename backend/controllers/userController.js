const User = require("../models/userModel");
const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const saveToken = require("../utils/generateSaveTokenInCookie");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns jwt TOEKN
 */
const registerUser = asyncWrapper(async (req, res, next) => {
  const cloudGallery = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloudGallery.public_id,
      url: cloudGallery.secure_url,
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

/**
 * @description generate a hash and send it to user email
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const forgotPassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(createCustomError(`${req.body.email} is not registered`, 404));
  }

  //get resetPasswordToken
  const resetToken = user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password token is :- \n\n ${resetPasswordURL} \n\n If you have not request this please ignore it.`;

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

/**
 * @description link to reset password from reset token
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns return and save token in cookie
 */
const resetPassword = asyncWrapper(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(createCustomError("link invalid or has been expired", 400));
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(createCustomError("password not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  saveToken(user, 200, res);
});

/**
 * @description get user details
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns user details
 */
const getUserDetails = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @description update password with your old password while login
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns return and save token in cookie
 */
const updatePassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(createCustomError("old Password is incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(createCustomError("password not matched", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  saveToken(user, 200, res);
});

/**
 * @description update user profile
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const updateProfile = asyncWrapper(async (req, res, next) => {
  const updatedUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar != "") {
    const user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const cloudGallery = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updatedUserDetails.avatar = {
      public_id: cloudGallery.public_id,
      url: cloudGallery.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @description get all user --admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getAllUser = asyncWrapper(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

/**
 * @description get a single user -admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      createCustomError(`user does not exists with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @description update user profile/role by admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const updateUserByAdmin = asyncWrapper(async (req, res, next) => {
  const updatedUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      createCustomError(`user does not exists with id: ${req.params.id}`, 404)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, updatedUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

/**
 * @description delete user by admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      createCustomError(`user does not exists with id: ${req.params.id}`, 404)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserByAdmin,
  deleteUser,
  logoutUser,
};
