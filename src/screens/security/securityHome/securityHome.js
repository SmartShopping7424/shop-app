import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";
import { CameraScan, LogoutAlert } from "../../../component";
import { getCameraPermission } from "../../../utils/helper";

const SecurityHome = () => {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = useState(false);
  const [showScanner, setShowScaner] = useState(false);

  // logout function
  const onLogout = async () => {
    await AsyncStorage.setItem("page", "auth");
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "auth" }],
    });
    navigation.dispatch(resetAction);
  };

  return (
    <View style={styles.container}>
      {/* scan button */}
      <TouchableOpacity
        style={styles.scanButtonView}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={async () => {
          const permission = await getCameraPermission();
          if (permission) {
            setShowScaner(true);
          }
        }}
      >
        <Text style={styles.scanButtonText}>Scan Bill</Text>
      </TouchableOpacity>

      {/* logout icon */}
      <TouchableOpacity
        style={styles.logoutView}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => setShowLogout(true)}
      >
        <MaterialCommunityIcons
          name="logout"
          size={(widthsize * 5) / 100}
          color={colors.blue}
        />
      </TouchableOpacity>

      {/* logout alert */}
      {showLogout ? (
        <LogoutAlert
          yes={() => {
            setShowLogout(false);
            onLogout();
          }}
          no={() => setShowLogout(false)}
        />
      ) : (
        <></>
      )}

      {/* if show scanner */}
      {showScanner ? (
        <CameraScan
          onClose={() => {
            setShowScaner(false);
          }}
          onData={(data) => {
            setShowScaner(false);
            console.log(data);
          }}
        />
      ) : (
        <></>
      )}
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
  logoutView: {
    position: "absolute",
    top: (heightsize * 5) / 100,
    right: (widthsize * 5) / 100,
    width: (widthsize * 12) / 100,
    height: (widthsize * 12) / 100,
    borderRadius: (widthsize * 6) / 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  scanButtonView: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 50) / 100,
    height: (heightsize * 4.5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: (widthsize * 2) / 100,
  },
  scanButtonText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.white,
  },
});

export default SecurityHome;
