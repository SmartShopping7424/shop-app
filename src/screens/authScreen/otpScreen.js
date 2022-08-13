import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { widthsize, heightsize } from "../../utils/dimensions";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import otp_logo from "../../../assets/images/otp_logo.jpg";

const OtpScreen = (props) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {}, [props]);

  return (
    <View style={styles.container}>
      {/* image */}
      <View style={styles.mobileView}>
        <Image style={styles.mobileLogo} source={otp_logo} />
      </View>

      {/* title */}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          Enter the OTP received on your Mobile Number
        </Text>
      </View>
      {/* otp input container */}
      <CodeField
        ref={ref}
        {...prop}
        value={value}
        onChangeText={(text) => {
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
              isFocused && { borderColor: "#3a86ff" },
            ]}
          >
            <Text style={styles.otp_text}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => props.submit(value)}
      >
        {props.otpLoader ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
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
    fontSize: (widthsize * 3.5) / 100,
    color: "#3a86ff",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a86ff",
    padding: (widthsize * 3) / 100,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 4) / 100,
    fontWeight: "500",
    color: "#fff",
  },
});

export default OtpScreen;
