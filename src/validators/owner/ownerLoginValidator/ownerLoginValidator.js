import validator from "validator";
import { toCamel } from "../../../utils/helper";

// method to validate owner login inputs
export const ownerLoginValidation = async (inputs, from) => {
  // define empty error
  var errors = {};

  // required attributes
  var required = from == "mobile" ? ["mobile"] : ["otp"];

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
        case "mobile":
          const mobile_number_format = /^[6-9][0-9]{9}$/;
          if (!mobile_number_format.test(value)) {
            errors[key] = "Please enter a valid mobile number";
          }
          break;
        case "otp":
          if (!validator.isLength(value, { min: 4, max: 4 })) {
            errors[key] = "Please enter a valid OTP";
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
