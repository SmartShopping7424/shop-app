import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import {
  widthsize,
  heightsize,
  statusbarheight,
} from "../../constant/dimensions";
import colors from "../../constant/colors";
import logo from "../../../assets/images/logo.png";
import maintenance_avatar from "../../../assets/images/maintenance_avatar.png";
import security_avatar from "../../../assets/images/security_avatar.png";
import Mobile from "./mobile";

const OwnerLogin = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(true);
  const [err, setErr] = useState(true);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setErr(true);
    });
    return () => null;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.login_bg} animated />

      <View style={styles.main_login_bg_view}>
        {/* background image */}
        <View style={styles.main_login_bg}>
          {/* logo */}
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          {/* login with mobile */}
          <Mobile setShow={(value) => setShow(value)} err={err} />

          {/* term and condition text */}
          <View
            style={[
              styles.termConditionView,
              { display: show ? "flex" : "none" },
            ]}
          >
            <Text style={styles.titleText}>
              By continuing, you agree to our
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text onPress={() => null} style={styles.subtitleText}>
                Terms and Conditions
              </Text>
              <Text style={styles.subtitleSign}>&</Text>
              <Text onPress={() => null} style={styles.subtitleText}>
                Privacy Policy
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* bottom container */}
      <View style={styles.bottomContainer}>
        {/* maintenance part */}
        <View
          style={[styles.leftCircleView, { display: show ? "flex" : "none" }]}
        >
          <TouchableOpacity
            style={styles.maintenanceLogoView}
            activeOpacity={0.6}
            delayPressIn={0}
            onPress={() => {
              setErr(false);
              navigation.navigate("maintenancelogin");
            }}
          >
            <Image
              source={maintenance_avatar}
              style={styles.maintenanceLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* security part */}
        <View
          style={[styles.rightCircleView, { display: show ? "flex" : "none" }]}
        >
          <TouchableOpacity
            style={styles.securityLogoView}
            activeOpacity={0.6}
            delayPressIn={0}
            onPress={() => {
              setErr(false);
              navigation.navigate("securitylogin");
            }}
          >
            <Image
              source={security_avatar}
              style={styles.securityLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  main_login_bg_view: {
    backgroundColor: colors.login_bg,
    borderBottomLeftRadius: (widthsize * 8) / 100,
    borderBottomRightRadius: (widthsize * 8) / 100,
  },
  main_login_bg: {
    height: (heightsize * 60) / 100,
    width: widthsize,
    overflow: "hidden",
  },
  logo: {
    alignSelf: "center",
    width: (widthsize * 50) / 100,
    height: (widthsize * 50) / 100,
  },
  termConditionView: {
    marginTop: (heightsize * 5) / 100,
    width: widthsize,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleText: {
    fontSize: (widthsize * 2.2) / 100,
    fontFamily: "Regular",
    color: colors.gray,
    textAlign: "center",
  },
  subtitleSign: {
    marginLeft: (widthsize * 1) / 100,
    marginRight: (widthsize * 1) / 100,
    color: colors.gray,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: (widthsize * 2.2) / 100,
  },
  subtitleText: {
    fontSize: (widthsize * 2.2) / 100,
    fontFamily: "Regular",
    color: colors.blue,
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: (heightsize * 20) / 100 - statusbarheight,
    width: widthsize,
    height: (heightsize * 20) / 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  leftCircleView: {
    width: (widthsize * 35) / 100,
    height: (widthsize * 36) / 100,
    borderTopRightRadius: (widthsize * 36) / 100,
    backgroundColor: colors.left_circle_bg,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  maintenanceLogoView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: (widthsize * 5) / 100,
    marginTop: (heightsize * 2) / 100,
  },
  maintenanceLogo: {
    width: (widthsize * 22) / 100,
    height: (widthsize * 22) / 100,
  },
  rightCircleView: {
    width: (widthsize * 35) / 100,
    height: (widthsize * 36) / 100,
    borderTopLeftRadius: (widthsize * 36) / 100,
    backgroundColor: colors.right_circle_bg,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  securityLogoView: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: (widthsize * 5) / 100,
    marginTop: (heightsize * 2) / 100,
  },
  securityLogo: {
    width: (widthsize * 22) / 100,
    height: (widthsize * 22) / 100,
  },
});

export default OwnerLogin;
