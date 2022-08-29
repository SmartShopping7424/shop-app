import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";

const OwnerHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.textinput_border} animated />

      {/* header */}
      <View style={styles.header}>
        {/* icon */}
        <Feather
          name="menu"
          size={(widthsize * 5) / 100}
          color={colors.black}
          style={{ marginLeft: (widthsize * 4) / 100 }}
          onPress={() => navigation.toggleDrawer()}
        />
        {/* text */}
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* rest container */}
      <View style={styles.restContainer}>
        <Text>Owner Home page</Text>

        <Text
          onPress={() => navigation.navigate("ownernew")}
          style={{ marginTop: (heightsize * 10) / 100 }}
        >
          Go to Owner New Page
        </Text>
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

export default OwnerHome;
