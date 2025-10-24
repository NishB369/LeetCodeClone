const User = require("../models/user.js");
const { validate } = require("../utils/validator.js");
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

module.exports = { register };
