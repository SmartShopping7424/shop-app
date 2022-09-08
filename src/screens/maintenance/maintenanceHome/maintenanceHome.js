import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightsize, widthsize } from "../../../constant/dimensions";
import colors from "../../../constant/colors";
import { CameraScan, LogoutAlert } from "../../../component";
import { getCameraPermission } from "../../../utils/helper";
import bag from "../../../../assets/images/bag.png";
import view_product from "../../../../assets/images/view_product.png";

const MaintenanceHome = () => {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = useState(false);
  const [showScanner, setShowScaner] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("maintenance_user_id");
        if (value != null) {
          setUserId(value);
        } else {
          setUserId("Maintenance");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userId]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} animated />

      {/* add/update products */}
      <TouchableOpacity
        style={styles.cardView}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={async () => {
          const permission = await getCameraPermission();
          if (permission) {
            setShowScaner(true);
          }
        }}
      >
        <Image source={bag} style={styles.cardLogo} />
        <Text style={styles.cardText}>Add / Update Products</Text>
      </TouchableOpacity>

      {/* view products */}
      <TouchableOpacity
        style={[styles.cardView, { marginTop: (heightsize * 5) / 100 }]}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => null}
      >
        <Image source={view_product} style={styles.cardLogo} />
        <Text style={styles.cardText}>View Products</Text>
      </TouchableOpacity>

      {/* maintenance details */}
      <View style={styles.detailsView}>
        <Text style={styles.detailsText}>
          <Text
            style={{
              color: colors.blue,
              fontFamily: "SemiBold",
            }}
          >
            Hello!{"  "}
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
      {showLogout ? <LogoutAlert no={() => setShowLogout(false)} /> : <></>}

      {/* if show scanner */}
      {showScanner ? (
        <CameraScan
          onClose={() => {
            setShowScaner(false);
          }}
          onData={(data) => {
            setShowScaner(false);
            navigation.navigate("maintenanceproduct", { qr: data });
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
    backgroundColor: colors.white,
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
  cardView: {
    width: (widthsize * 35) / 100,
    paddingTop: (widthsize * 3) / 100,
    paddingBottom: (widthsize * 3) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: (widthsize * 2) / 100,
    overflow: "hidden",
  },
  cardLogo: {
    width: (widthsize * 20) / 100,
    height: (widthsize * 20) / 100,
  },
  cardText: {
    marginTop: (heightsize * 2) / 100,
    fontSize: (widthsize * 3) / 100,
    fontFamily: "SemiBold",
    color: colors.black,
  },
});

export default MaintenanceHome;
