import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { heightsize, widthsize } from "../../constant/dimensions";
import colors from "../../constant/colors";

const bg_color = "rgba(0,0,0,0.5)";

const LogoutAlert = (props) => {
  // real time update props
  useEffect(() => {}, [props]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bg_color} animated />

      {/* box container */}
      <View style={styles.boxContainer}>
        {/* title */}
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Log Out</Text>
        </View>

        {/* content */}
        <View style={styles.contentView}>
          <Text style={styles.contentText}>
            Are you sure you want to logout from the application ?
          </Text>
        </View>

        {/* button container */}
        <View style={styles.buttonContainerView}>
          {/* yes */}
          <TouchableOpacity
            activeOpacity={0.6}
            delayPressIn={0}
            style={styles.buttonTextYesView}
            onPress={() => props.yes()}
          >
            <Text style={styles.buttonTextYes}>Yes</Text>
          </TouchableOpacity>

          {/* no */}
          <TouchableOpacity
            activeOpacity={0.6}
            delayPressIn={0}
            style={styles.buttonTextNoView}
            onPress={() => props.no()}
          >
            <Text style={styles.buttonTextNo}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: widthsize,
    height: heightsize,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bg_color,
  },
  boxContainer: {
    width: (widthsize * 90) / 100,
    height: (heightsize * 15) / 100,
    backgroundColor: colors.white,
    borderRadius: (widthsize * 2) / 100,
    overflow: "hidden",
  },
  titleView: {
    width: "100%",
    height: "30%",
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
  titleText: {
    fontSize: (widthsize * 3.5) / 100,
    color: colors.white,
    fontFamily: "SemiBold",
    marginLeft: (widthsize * 3) / 100,
  },
  contentView: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
  },
  contentText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.black,
    fontFamily: "Regular",
    marginLeft: (widthsize * 3) / 100,
  },
  buttonContainerView: {
    width: "100%",
    height: "30%",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  buttonTextYesView: {
    marginRight: (widthsize * 5) / 100,
    paddingLeft: (widthsize * 2) / 100,
    paddingRight: (widthsize * 2) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextYes: {
    fontSize: (widthsize * 3) / 100,
    color: colors.blue,
    fontFamily: "Regular",
  },
  buttonTextNoView: {
    marginRight: (widthsize * 5) / 100,
    paddingLeft: (widthsize * 2) / 100,
    paddingRight: (widthsize * 2) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextNo: {
    fontSize: (widthsize * 3) / 100,
    color: colors.blue,
    fontFamily: "Regular",
  },
});

export default LogoutAlert;
