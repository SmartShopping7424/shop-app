import React, { useEffect, useState } from "react";
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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("security_user_id");
        if (value != null) {
          setUserId(value);
        } else {
          setUserId("Security");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userId]);

  // remove all local storage
  const clearAllData = async () => {
    await AsyncStorage.getAllKeys().then(async (keys) => {
      await AsyncStorage.multiRemove(keys).then(() => {
        onLogout();
      });
    });
  };

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

      {/* security details */}
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>
          <Text
            style={{
              color: colors.blue,
              fontFamily: "SemiBold",
            }}
          >
            Hello,{" "}
          </Text>
          {userId.length > 15 ? userId.substring(0, 14) + "..." : userId}
        </Text>
      </View>

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
          color={colors.white}
        />
      </TouchableOpacity>

      {/* logout alert */}
      {showLogout ? (
        <LogoutAlert
          yes={() => {
            setShowLogout(false);
            clearAllData();
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
            navigation.navigate("securitybill", { qr: data });
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
    backgroundColor: colors.blue,
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
  detailsView: {
    position: "absolute",
    top: (heightsize * 5) / 100,
    left: 0,
    width: (widthsize * 40) / 100,
    padding: (widthsize * 3) / 100,
    paddingRight: 0,
    paddingLeft: (widthsize * 1.5) / 100,
    borderTopRightRadius: (widthsize * 3) / 100,
    borderBottomRightRadius: (widthsize * 3) / 100,
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
  detailsText: {
    fontSize: (widthsize * 3) / 100,
    fontFamily: "Regular",
    textAlign: "left",
    color: colors.black,
  },
});

export default SecurityHome;
