// method to validate owner login inputs
export const ownerLoginValidation = async (inputs, from) => {
  // define empty error
  var errors = {};

  // required attributes
  var required = from == "mobile" ? ["mobile"] : ["otp"];

  // check if key missing from inputs
  required.map((key) => {
    if (!inputs.hasOwnProperty(key)) {
      errors[key] = `${key} is required`;
    } else {
      errors[key] = "";
    }
  });

  // check inputs values
  for (let key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      // extract value
      value = String(inputs[key]).trim();

      switch (key) {
        case "mobile":
          const mobile_number_format = /^[6-9][0-9]{9}$/;
          if (value.length == 0) {
            errors[key] = "Invalid, mobile number is required";
          } else {
            if (value.length != 10) {
              errors[key] = "Invalid, mobile number must be of 10 digits";
            } else {
              if (!mobile_number_format.test(value)) {
                errors[key] =
                  "Invalid, please enter a valid mobile number, starts with [6-9]";
              }
            }
          }
          break;
        case "otp":
          if (value.length != 4) {
            errors[key] = "Invalid, please enter a valid OTP";
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
