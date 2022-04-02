const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserByAdmin,
  deleteUser,
} = require("../controllers/userController");

const {
  isAuthenticated,
  isAuthorizeRoles,
} = require("../middleware/authetication");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/me/update").put(isAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, isAuthorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, isAuthorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateUserByAdmin)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteUser);

module.exports = router;
