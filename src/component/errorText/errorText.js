import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constant/colors";
import { heightsize, widthsize } from "../../constant/dimensions";

const ErrorText = (props) => {
  return (
    <View
      style={[
        styles.errorTextView,
        { display: props.show ? "flex" : "none", ...props.style },
      ]}
    >
      <Text style={styles.errText}>{props.err}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorTextView: {
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 0.9) / 100,
  },
  errText: {
    fontSize: (widthsize * 2.3) / 100,
    fontFamily: "Regular",
    color: colors.red,
  },
});

export default ErrorText;
