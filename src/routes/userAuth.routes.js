const express = require("express");
const { register, login } = require("../controllers/userAuth.controllers.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
// authRouter.post("/logout", logout);
// authRouter.post("/getProfile", getProfile);

module.exports = { authRouter };
