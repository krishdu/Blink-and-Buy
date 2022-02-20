/**
 * @description generate and save token in cookie using userSchema
 * @param  {} user
 * @param  {} statusCode
 * @param  {} res
 * @returns {} {success: true, user, token}
 */

const saveToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //additional options to save cookie
  const cookieSavingOptions = {
    httpOnly: true,
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", token, cookieSavingOptions).json({
    success: true,
    user,
    token,
  });
};

module.exports = saveToken;
