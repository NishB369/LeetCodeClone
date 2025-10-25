const validator = require("validator");

const validate = (data) => {
  const mandatoryFields = ["firstName", "emailId", "password"];
  const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) {
    throw new Error("Some Fields are Missing");
  }

  if (!validator.isEmail(data.emailId)) {
    throw new Error("Invlaid Email");
  }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Weak Password");
  }
};

const validateLogin = (data) => {
  const mandatoryFields = ["emailId", "password"];
  const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) {
    throw new Error("Some Fields are Missing");
  }

  if (!validator.isEmail(data.emailId)) {
    throw new Error("Invlaid Email");
  }
};

module.exports = { validate, validateLogin };
