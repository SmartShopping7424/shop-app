import validator from "validator";
import { toCamel } from "../../../utils/helper";

// method to validate security login inputs
export const securityLoginValidator = async (inputs) => {
  // define empty error
  var errors = {};

  // required attributes
  var required = ["shopId", "userId", "password"];

  // check if key missing from inputs
  required.map((key) => {
    if (!inputs.hasOwnProperty(key)) {
      errors[key] = `${toCamel(key)} is required`;
    } else {
      errors[key] = "";
    }
  });

  // check inputs values
  for (let key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      value = validator.trim(String(inputs[key]));

      switch (key) {
        case "shopId":
          if (!validator.isLength(value, { min: 12, max: 20 })) {
            if (value.length > 20) {
              errors[key] =
                "Invalid, shop id cannot be greater than 20 characters";
            } else if (value.length > 0 && value.length < 12) {
              errors[key] = "Invalid, shop id must be atleast of 12 characters";
            } else {
              errors[key] = "Please enter a valid shop id";
            }
          }
          break;
        case "userId":
          if (!validator.isLength(value, { min: 5, max: 20 })) {
            if (value.length > 20) {
              errors[key] =
                "Invalid, user id cannot be greater than 20 characters";
            } else if (value.length > 0 && value.length < 5) {
              errors[key] = "Invalid, user id must be atleast of 5 characters";
            } else {
              errors[key] = "Please enter a valid user id";
            }
          }
          break;
        case "password":
          if (!validator.isLength(value, { min: 8, max: 8 })) {
            if (value.length > 8) {
              errors[key] =
                "Invalid, password cannot be greater than 8 characters";
            } else if (value.length > 0 && value.length < 8) {
              errors[key] = "Invalid, password must be of 8 characters";
            } else {
              errors[key] = "Please enter a valid password";
            }
          }
          break;
        default:
          break;
      }
    }
  }

  // check the error object
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      let value = errors[key];
      if (value.length == 0) {
        delete errors[key];
      }
    }
  }

  // return error object
  return errors;
};
