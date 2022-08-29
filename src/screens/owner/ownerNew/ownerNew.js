import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";

const OwnerNew = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.textinput_border} animated />

      {/* header */}
      <View style={styles.header}>
        {/* icon */}
        <AntDesign
          name="arrowleft"
          size={(widthsize * 5) / 100}
          color={colors.black}
          style={{ marginLeft: (widthsize * 4) / 100 }}
          onPress={() => navigation.goBack()}
        />
        {/* text */}
        <Text style={styles.headerText}>Owner New Page</Text>
      </View>

      {/* rest container */}
      <View style={styles.restContainer}>
        <Text>Owner New page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: (heightsize * 6) / 100,
    backgroundColor: colors.textinput_border,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: (widthsize * 3.5) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
    marginLeft: (widthsize * 3) / 100,
  },
  restContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OwnerNew;
