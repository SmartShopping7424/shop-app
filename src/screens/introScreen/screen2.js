import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import colors from "../../constant/colors";
import intro_page2 from "../../../assets/images/intro_page2.png";
import { heightsize, widthsize } from "../../constant/dimensions";

const Screen2 = () => {
  return (
    <View style={styles.container}>
      {/* image background */}
      <ImageBackground source={intro_page2} style={styles.imageBackground}>
        {/* description */}
        <Text style={styles.title}>Title</Text>
        <Text style={styles.subTitle}>Description</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: widthsize,
    height: heightsize,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    right: (widthsize * 25) / 100,
    fontSize: (widthsize * 4) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  subTitle: {
    position: "absolute",
    bottom: (heightsize * 20) / 100,
    fontSize: (widthsize * 3) / 100,
    fontFamily: "Regular",
    color: colors.gray,
  },
});

export default Screen2;
