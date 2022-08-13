import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Auth from "@aws-amplify/auth";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthsize, heightsize } from "../../utils/dimensions";
import mobile_logo from "../../../assets/images/mobile_logo.png";
import { randomNumber } from "../../utils/helper";
import OtpScreen from "./otpScreen";

const MobileScreen = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [view, setView] = useState("mobile");
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);

  useEffect(() => {}, [view]);

  // sign up function
  const onSignUp = async () => {
    Keyboard.dismiss();
    const phoneNumber = `+91${mobile}`;
    await Auth.signUp({
      username: phoneNumber,
      password: randomNumber(8),
    })
      .then(() => {
        console.log("Successfully Sign Up");
        onSignIn();
      })
      .catch((err) => {
        if (
          err.message ==
          "An account with the given phone_number already exists."
        ) {
          onSignIn();
        } else {
          console.log("Error while sign up ::: ", err);
        }
      });
  };

  // sign in function
  const onSignIn = async () => {
    const phoneNumber = `+91${mobile}`;
    await Auth.signIn(phoneNumber)
      .then((res) => {
        setTimeout(() => {
          console.log("Successfully Send OTP");
          setUser(res);
          setLoader(false);
          setView("otp");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error while sending otp ::: ", err);
      });
  };

  // submit function
  const onSubmit = async (otp) => {
    await Auth.sendCustomChallengeAnswer(user, otp)
      .then((res) => {
        setTimeout(async () => {
          console.log("Successfully Login");
          await AsyncStorage.setItem("page", "auth");
          setOtpLoader(false);
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "main" }],
          });
          navigation.dispatch(resetAction);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error while verifing otp ::", err);
      });
  };

  // if view is otp return otp view
  if (view == "otp") {
    return (
      <OtpScreen
        otpLoader={otpLoader}
        submit={(value) => {
          Keyboard.dismiss();
          setOtpLoader(true);
          onSubmit(value);
        }}
      />
    );
  }

  // else reutrn mobile view
  else {
    return (
      <View style={styles.container}>
        {/* image */}
        <View style={styles.mobileView}>
          <Image style={styles.mobileLogo} source={mobile_logo} />
        </View>

        {/* title */}
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Login using your Mobile Number</Text>
        </View>

        {/* text input */}
        <View style={styles.textInputView}>
          <Text style={styles.countryCodeText}>+91 -</Text>
          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor="#bdbdbd"
            maxLength={10}
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))}
            style={styles.textInput}
          />
        </View>

        {/* button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => {
            setLoader(true);
            onSignUp();
          }}
        >
          {loader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Get OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mobileView: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: (heightsize * 3) / 100,
  },
  mobileLogo: {
    width: (widthsize * 50) / 100,
    height: (widthsize * 50) / 100,
  },
  titleView: {
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 2) / 100,
  },
  titleText: {
    fontSize: (widthsize * 7) / 100,
    fontWeight: "600",
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 2) / 100,
    backgroundColor: "#fff",
    borderRadius: (widthsize * 2) / 100,
    overflow: "hidden",
    padding: (widthsize * 3) / 100,
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
    fontSize: (widthsize * 3.5) / 100,
    fontWeight: "bold",
  },
  textInput: {
    flex: 1,
    paddingLeft: (widthsize * 1) / 100,
    fontSize: (widthsize * 3.5) / 100,
    color: "#424242",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a86ff",
    padding: (widthsize * 3.5) / 100,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 4) / 100,
    fontWeight: "500",
    color: "#fff",
  },
});

export default MobileScreen;
