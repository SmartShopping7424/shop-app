import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import colors from "../../constant/colors";
import intro_page1 from "../../../assets/images/intro_page1.png";
import { heightsize, widthsize } from "../../constant/dimensions";

const Intro1 = () => {
  return (
    <View style={styles.container}>
      {/* image background */}
      <ImageBackground source={intro_page1} style={styles.imageBackground}>
        {/* description */}
        <View style={styles.descriptionView}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.subTitle}>Description</Text>
        </View>
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
  descriptionView: {
    position: "absolute",
    bottom: (heightsize * 20) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: (widthsize * 4) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
  subTitle: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "Regular",
    color: colors.gray,
  },
});

export default Intro1;
