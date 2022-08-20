import { View, Text, StyleSheet } from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../constant/colors";
import { widthsize, heightsize } from "../constant/dimensions";

const toastConfig = {
  // custom type success toast
  customSuccess: ({ text1 }) => (
    <View style={styles.successToastContainer}>
      {/* icon */}
      <AntDesign
        name="checkcircle"
        size={(widthsize * 4) / 100}
        color={colors.success_txt}
        style={{ marginLeft: (widthsize * 2) / 100 }}
      />
      {/* text */}
      <Text style={styles.successToastText}>{text1}</Text>
    </View>
  ),

  // custom type error toast
  customError: ({ text1 }) => (
    <View style={styles.errorToastContainer}>
      {/* icon */}
      <MaterialIcons
        name="error"
        size={(widthsize * 4) / 100}
        color={colors.error_txt}
        style={{ marginLeft: (widthsize * 3) / 100 }}
      />
      {/* text */}
      <Text style={styles.errorToastText}>{text1}</Text>
    </View>
  ),

  // custom type warning toast
  customWarning: ({ text1 }) => (
    <View style={styles.warningToastContainer}>
      {/* icon */}
      <Ionicons
        name="warning"
        size={(widthsize * 4) / 100}
        color={colors.warning_txt}
        style={{ marginLeft: (widthsize * 2) / 100 }}
      />
      {/* text */}
      <Text style={styles.warningToastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  successToastContainer: {
    width: (widthsize * 80) / 100,
    height: (heightsize * 5) / 100,
    marginBottom: (heightsize * 7) / 100,
    backgroundColor: colors.success_bg,
    borderWidth: 0.5,
    borderColor: colors.success_txt,
    borderRadius: (widthsize * 2) / 100,
    flexDirection: "row",
    alignItems: "center",
  },
  successToastText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.success_txt,
    fontFamily: "Regular",
    marginLeft: (widthsize * 2) / 100,
  },
  errorToastContainer: {
    width: (widthsize * 80) / 100,
    height: (heightsize * 5) / 100,
    marginBottom: (heightsize * 7) / 100,
    backgroundColor: colors.error_bg,
    borderWidth: 0.5,
    borderColor: colors.error_txt,
    borderRadius: (widthsize * 2) / 100,
    flexDirection: "row",
    alignItems: "center",
  },
  errorToastText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.error_txt,
    fontFamily: "Regular",
    marginLeft: (widthsize * 2) / 100,
  },
  warningToastContainer: {
    width: (widthsize * 80) / 100,
    height: (heightsize * 5) / 100,
    marginBottom: (heightsize * 7) / 100,
    backgroundColor: colors.warning_bg,
    borderWidth: 0.5,
    borderColor: colors.warning_txt,
    borderRadius: (widthsize * 2) / 100,
    flexDirection: "row",
    alignItems: "center",
  },
  warningToastText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.warning_txt,
    fontFamily: "Regular",
    marginLeft: (widthsize * 2) / 100,
  },
});

export default toastConfig;
