import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../constant/colors";
import loader from "../../../assets/images/loader.gif";
import { widthsize } from "../../constant/dimensions";

const FullScreenLoader = () => {
  return (
    <View style={styles.absolute_container}>
      <StatusBar backgroundColor={colors.white} animated />
      {/* loader view */}
      <View style={styles.loaderView}>
        <Image source={loader} style={styles.loader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  loaderView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: (widthsize * 40) / 100,
  },
  loader: {
    width: (widthsize * 15) / 100,
    height: (widthsize * 15) / 100,
  },
});

export default FullScreenLoader;
