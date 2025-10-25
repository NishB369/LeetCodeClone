const express = require("express");
const {
  register,
  login,
  logout,
  adminRegister,
} = require("../controllers/userAuth.controllers.js");
const { userMiddleware } = require("../middlewares/user.middlewares.js");
const { adminMiddleware } = require("../middlewares/admin.middleware.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/register/admin", adminMiddleware, adminRegister);
// authRouter.post("/getProfile", getProfile);

module.exports = { authRouter };
