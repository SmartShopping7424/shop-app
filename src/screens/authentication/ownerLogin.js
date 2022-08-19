import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { widthsize, heightsize } from "../../constant/dimensions";
import colors from "../../constant/colors";
import logo from "../../../assets/images/logo.png";
import left_circle from "../../../assets/images/left_circle.png";
import right_circle from "../../../assets/images/right_circle.png";
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
      {/* background image */}
      <View style={styles.main}>
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
          <Text style={styles.titleText}>By continuing, you agree to our</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.subtitleText}>Terms and Conditions</Text>
            <Text style={styles.subtitleAndSign}>&</Text>
            <Text style={styles.subtitleText}>Privacy Policy</Text>
          </View>
        </View>
      </View>

      {/* maintenance part */}
      <Image
        source={left_circle}
        style={[styles.leftCircle, { display: show ? "flex" : "none" }]}
      />
      <TouchableOpacity
        style={[
          styles.maintenanceLogoView,
          { display: show ? "flex" : "none" },
        ]}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => {
          setErr(false);
          navigation.navigate("maintenancelogin");
        }}
      >
        <Image
          source={maintenance_avatar}
          style={[styles.maintenanceLogo, { display: show ? "flex" : "none" }]}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* security part */}
      <Image
        source={right_circle}
        style={[styles.rightCircle, { display: show ? "flex" : "none" }]}
      />
      <TouchableOpacity
        style={[styles.securityLogoView, { display: show ? "flex" : "none" }]}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => {
          setErr(false);
          navigation.navigate("securitylogin");
        }}
      >
        <Image
          source={security_avatar}
          style={[styles.securityLogo, { display: show ? "flex" : "none" }]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  main: {
    backgroundColor: "#f5f9ff",
    width: widthsize,
    paddingBottom: (heightsize * 5) / 100,
    alignItems: "center",
    borderBottomLeftRadius: (widthsize * 8) / 100,
    borderBottomRightRadius: (widthsize * 8) / 100,
  },
  logo: {
    marginTop: (heightsize * 3) / 100,
    width: (widthsize * 70) / 100,
    height: (widthsize * 70) / 100,
  },
  termConditionView: {
    marginTop: (heightsize * 10) / 100,
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
  subtitleAndSign: {
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
  leftCircle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: (widthsize * 60) / 100,
    height: (widthsize * 45) / 100,
  },
  maintenanceLogoView: {
    position: "absolute",
    bottom: (heightsize * 1) / 100,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  maintenanceLogo: {
    width: (widthsize * 30) / 100,
    height: (widthsize * 30) / 100,
    marginLeft: (widthsize * 2) / 100,
  },
  rightCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: (widthsize * 60) / 100,
    height: (widthsize * 45) / 100,
  },
  securityLogoView: {
    position: "absolute",
    bottom: (heightsize * 1) / 100,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  securityLogo: {
    width: (widthsize * 30) / 100,
    height: (widthsize * 30) / 100,
    marginRight: (widthsize * 2) / 100,
  },
});

export default OwnerLogin;
