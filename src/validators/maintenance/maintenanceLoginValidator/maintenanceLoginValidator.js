// method to validate maintenance login inputs
export const maintenanceLoginValidator = async (inputs, mode) => {
  // define empty error
  var errors = {};

  // required attributes
  var required = mode == "all" ? ["shopId", "userId", "password"] : ["shopId"];

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
        case "shopId":
          if (value.length > 20) {
            errors[key] =
              "Invalid, shop id cannot be greater than 20 characters";
          } else {
            if (value.length == 0) {
              errors[key] = "Invalid, shop id is required";
            } else if (value.length > 0 && value.length < 12) {
              errors[key] = "Invalid, shop id must be atleast of 12 characters";
            }
          }
          break;
        case "userId":
          if (value.length > 20) {
            errors[key] =
              "Invalid, user id cannot be greater than 20 characters";
          } else {
            if (value.length == 0) {
              errors[key] = "Invalid, user id is required";
            } else if (value.length > 0 && value.length < 5) {
              errors[key] = "Invalid, user id must be atleast of 5 characters";
            }
          }
          break;
        case "password":
          if (value.length > 8) {
            errors[key] =
              "Invalid, password cannot be greater than 8 characters";
          } else {
            if (value.length == 0) {
              errors[key] = "Invalid, password is required";
            } else if (value.length > 0 && value.length < 8) {
              errors[key] = "Invalid, password must be atleast of 8 characters";
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
