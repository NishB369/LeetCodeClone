const express = require("express");
const { register, login, logout } = require("../controllers/userAuth.controllers.js");
const { userMiddleware } = require("../middlewares/user.middlewares.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
// authRouter.post("/getProfile", getProfile);

module.exports = { authRouter };
