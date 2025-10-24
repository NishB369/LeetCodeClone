const User = require("../models/user.js");
const { validate, validateLogin } = require("../utils/validator.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    validate(req.body);

    const { firstName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    validateLogin(req.body);
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Invalid Credntials!");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("User Not Found");
    }

    const matched = await bcrypt.compare(password, user?.password);

    if (!matched) {
      throw new Error("Invalid Credntials!");
    }
    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Logged In Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
