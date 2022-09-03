import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../../constant/colors";

const MaintenanceProduct = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} animated />
      <Text>Products</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MaintenanceProduct;
