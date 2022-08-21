import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
// import Auth from "@aws-amplify/auth";
// import { randomNumber } from "../../utils/helper";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthsize, heightsize } from "../../constant/dimensions";
import Otp from "./otp";
import colors from "../../constant/colors";
import { ErrorText } from "../../component";
import { ownerLoginValidation } from "../../validators/owner/ownerLoginValidator/ownerLoginValidator";
import { successToast } from "../../utils/helper";

const Mobile = (props) => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState("mobile");
  // const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);

  useEffect(() => {
    if (props.err == false) {
      setMobile("");
      setError("");
    }
  }, [view, props, error, mobile]);

  // sign up function
  // const onSignUp = async () => {
  //   Keyboard.dismiss();
  //   const phoneNumber = `+91${mobile}`;
  //   await Auth.signUp({
  //     username: phoneNumber,
  //     password: randomNumber(8),
  //   })
  //     .then(() => {
  //       console.log("Successfully Sign Up");
  //       onSignIn();
  //     })
  //     .catch((err) => {
  //       if (
  //         err.message ==
  //         "An account with the given phone_number already exists."
  //       ) {
  //         onSignIn();
  //       } else {
  //         console.log("Error while sign up ::: ", err);
  //       }
  //     });
  // };

  // sign in function
  // const onSignIn = async () => {
  //   const phoneNumber = `+91${mobile}`;
  //   await Auth.signIn(phoneNumber)
  //     .then((res) => {
  //       setTimeout(() => {
  //         console.log("Successfully Send OTP");
  //         setUser(res);
  //         setLoader(false);
  //         setView("otp");
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       console.log("Error while sending otp ::: ", err);
  //     });
  // };

  // submit function
  // const onSubmit = async (otp) => {
  //   await Auth.sendCustomChallengeAnswer(user, otp)
  //     .then((res) => {
  //       setTimeout(async () => {
  //         console.log("Successfully Login");
  //         await AsyncStorage.setItem("page", "auth");
  //         setOtpLoader(false);
  //         const resetAction = CommonActions.reset({
  //           index: 0,
  //           routes: [{ name: "main" }],
  //         });
  //         navigation.dispatch(resetAction);
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       console.log("Error while verifing otp ::", err);
  //     });
  // };

  // if view is otp return otp view
  if (view == "otp") {
    return (
      <Otp
        mobile={mobile}
        otpLoader={otpLoader}
        submit={() => {
          Keyboard.dismiss();
          setOtpLoader(true);
          setTimeout(() => {
            successToast("Login successful");
          }, 1500);
          setTimeout(async () => {
            await AsyncStorage.setItem("page", "ownermain");
            setOtpLoader(false);
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: "ownermain" }],
            });
            navigation.dispatch(resetAction);
          }, 3000);
        }}
        change={() => {
          setView("mobile");
          props.setShow(true);
        }}
        // submit={(value) => {
        //   Keyboard.dismiss();
        //   setOtpLoader(true);
        //   onSubmit(value);
        // }}
      />
    );
  }

  // else reutrn mobile view
  else {
    return (
      <View style={styles.container}>
        {/* text input */}
        <View
          style={[
            styles.textInputView,
            {
              borderColor:
                error.length > 0 ? colors.red : colors.textinput_border,
            },
          ]}
        >
          <Text style={styles.countryCodeText}>+91 -</Text>
          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor={colors.gray}
            maxLength={10}
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(text) => {
              setError("");
              setMobile(text.replace(/[^0-9]/g, ""));
            }}
            style={styles.textInput}
          />
        </View>

        {/* error msg */}
        <ErrorText err={error} show={error.length > 0 ? true : false} />

        {/* button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={async () => {
            const err = await ownerLoginValidation({ mobile }, "mobile");
            if (Object.getOwnPropertyNames(err).length == 0) {
              Keyboard.dismiss();
              setLoader(true);
              setTimeout(() => {
                setLoader(false);
                props.setShow(false);
                setView("otp");
              }, 1500);
            } else {
              setError(err.mobile);
            }
          }}
          // onPress={() => {
          //   setLoader(true);
          //   onSignUp();
          // }}
        >
          {loader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: (heightsize * 5) / 100,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    height: (heightsize * 5) / 100,
    backgroundColor: colors.white,
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  countryCodeText: {
    fontSize: (widthsize * 2.8) / 100,
    marginLeft: (widthsize * 2) / 100,
    fontFamily: "SemiBold",
  },
  textInput: {
    flex: 1,
    marginLeft: (widthsize * 1) / 100,
    fontSize: (widthsize * 2.8) / 100,
    fontFamily: "Regular",
    color: colors.black,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    height: (heightsize * 5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.white,
  },
});

export default Mobile;
