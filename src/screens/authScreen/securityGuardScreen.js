import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { widthsize, heightsize } from "../../utils/dimensions";

const SecurityGuardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>security gaurd page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SecurityGuardScreen;
