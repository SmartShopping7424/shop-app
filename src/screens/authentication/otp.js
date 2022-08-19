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

const Otp = (props) => {
  const [value, setValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // update props
  useEffect(() => {}, [props]);

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
          setErrMsg("");
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
                  : errMsg.length > 0
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

      {/* invalid msg */}
      <View
        style={[
          styles.errorTextView,
          { display: errMsg.length > 0 ? "flex" : "none" },
        ]}
      >
        <Text style={styles.errText}>{errMsg}</Text>
      </View>

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => {
          Keyboard.dismiss();
          if (value.length != 4) {
            setErrMsg("Please enter a valid OTP");
          } else {
            props.submit();
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
    fontSize: (widthsize * 3) / 100,
    color: colors.black,
    fontFamily: "Regular",
    textAlign: "center",
  },
  errorTextView: {
    alignSelf: "center",
    width: (widthsize * 65) / 100,
    marginTop: (heightsize * 0.9) / 100,
  },
  errText: {
    fontSize: (widthsize * 2.3) / 100,
    fontFamily: "Regular",
    color: colors.red,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    height: (heightsize * 4.5) / 100,
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

export default Otp;
