const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(60).required().messages({
    "string.base": `First name should be a type of 'text'`,
    "string.empty": `"First name cannot be an empty field`,
    "string.min": `First name should have a minimum length of {#limit}`,
    "string.max": `First name should have a maximum length of {#limit}`,
    "any.required": `First name is a required field`,
  }),
  lastName: Joi.string().alphanum().min(3).max(60).required().messages({
    "string.base": `Last name should be a type of 'text'`,
    "string.empty": `"Last name cannot be an empty field`,
    "string.min": `Last name should have a minimum length of {#limit}`,
    "string.max": `Last name should have a maximum length of {#limit}`,
    "any.required": `Last name is a required field`,
  }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    )
    .messages({
      "string.pattern.base": "Invalid password",
      "string.min": "minimum 8 character required",
    })
    .required(),
});

module.exports = schema;
