import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { widthsize, heightsize } from "../../constant/dimensions";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import colors from "../../constant/colors";
import { ownerLoginValidation } from "../../validators/owner/ownerLoginValidator/ownerLoginValidator";
import { ErrorText } from "../../component";

const Otp = (props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [seconds, setSeconds] = useState(59);
  // update props
  useEffect(() => {}, [props]);

  // otp timer function
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>OTP verification</Text>
        <Text style={styles.subtitleText}>
          We've sent a verification code to
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.mobileText}>{`+91-${props.mobile}`}</Text>
          <TouchableOpacity
            style={{ marginLeft: (widthsize * 2) / 100 }}
            activeOpacity={0.6}
            delayPressIn={0}
            onPress={() => props.change()}
          >
            <Text style={styles.changeText}>change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* otp input container */}
      <CodeField
        ref={ref}
        {...prop}
        value={value}
        onChangeText={(text) => {
          setError("");
          setValue(text.replace(/[^0-9]/g, ""));
        }}
        cellCount={4}
        rootStyle={styles.otp_container}
        onFocus={() => {
          if (value.length == 4) {
            setValue(value.slice(0, -1));
          }
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.otp_box_container,
              {
                borderColor: isFocused
                  ? colors.blue
                  : error.length > 0
                  ? colors.red
                  : colors.textinput_border,
              },
            ]}
          >
            <Text style={styles.otp_text}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {/* error msg */}
      <ErrorText
        style={{ alignItems: "center", justifyContent: "center" }}
        err={error}
        show={error.length > 0 ? true : false}
      />

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={async () => {
          const err = await ownerLoginValidation({ otp: value }, "otp");
          if (Object.getOwnPropertyNames(err).length == 0) {
            Keyboard.dismiss();
            props.submit();
          } else {
            setError(err.otp);
          }
        }}
        // onPress={() => props.submit(value)}
      >
        {props.otpLoader ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* resend timer */}
      <View style={styles.timerView}>
        {seconds == 0 ? (
          <Text
            style={[
              styles.timerText,
              { color: colors.blue, fontFamily: "SemiBold" },
            ]}
            onPress={() => setSeconds(59)}
          >
            Resend OTP
          </Text>
        ) : (
          <Text style={styles.timerText}>
            Resend OTP in{" "}
            <Text style={{ color: colors.blue, fontFamily: "SemiBold" }}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>{" "}
            seconds
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: (heightsize * 5) / 100,
  },
  titleView: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: (widthsize * 90) / 100,
  },
  titleText: {
    fontSize: (widthsize * 3.8) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  subtitleText: {
    fontSize: (widthsize * 3.2) / 100,
    fontFamily: "Regular",
    color: colors.gray,
  },
  mobileText: {
    fontSize: (widthsize * 3.2) / 100,
    fontFamily: "Regular",
    color: colors.gray,
  },
  changeText: {
    fontSize: (widthsize * 3.2) / 100,
    fontFamily: "SemiBold",
    color: colors.blue,
  },
  otp_container: {
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 65) / 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  otp_box_container: {
    height: (widthsize * 10) / 100,
    width: (widthsize * 10) / 100,
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    borderColor: colors.textinput_border,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  otp_text: {
    fontSize: (widthsize * 2.8) / 100,
    color: colors.black,
    fontFamily: "Regular",
    textAlign: "center",
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
  timerView: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 3) / 100,
  },
  timerText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "Regular",
    color: colors.gray,
  },
});

export default Otp;
