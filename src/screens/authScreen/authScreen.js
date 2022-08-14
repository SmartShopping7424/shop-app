import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { widthsize, heightsize } from "../../utils/dimensions";
import auth_logo from "../../../assets/images/auth_logo.png";

const AuthScreen = () => {
  const navigation = useNavigation();

  const loginButtonOptions = (title, routePage) => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => navigation.navigate(routePage)}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* title view */}
      <View style={styles.titleView}>
        {/* logo */}
        <Image style={styles.titleLogo} source={auth_logo} />
        {/* text */}
        <Text style={styles.titleText}>Login as</Text>
      </View>

      {/* button view */}
      <View style={styles.buttonView}>
        {/* shop owner */}
        {loginButtonOptions("Owner", "mobile")}

        {/* shop maintainer */}
        {loginButtonOptions("Maintainer", "maintainer")}

        {/* shop security */}
        {loginButtonOptions("Security Guard", "security")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleView: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: (heightsize * 3) / 100,
  },
  titleLogo: {
    width: (widthsize * 50) / 100,
    height: (widthsize * 50) / 100,
  },
  titleText: {
    marginTop: (heightsize * 2) / 100,
    fontSize: (widthsize * 10) / 100,
    fontWeight: "500",
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: (widthsize * 40) / 100,
    height: (heightsize * 20) / 100,
    marginTop: (heightsize * 5) / 100,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a86ff",
    padding: (widthsize * 2) / 100,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 4) / 100,
    fontWeight: "500",
    color: "#fff",
  },
});

export default AuthScreen;
