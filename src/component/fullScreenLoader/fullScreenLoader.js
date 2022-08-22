import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../constant/colors";

const FullScreenLoader = () => {
  return (
    <View style={styles.absolute_container}>
      <StatusBar backgroundColor={colors.white} animated />
      <ActivityIndicator size="large" color={colors.blue} />
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
});

export default FullScreenLoader;
