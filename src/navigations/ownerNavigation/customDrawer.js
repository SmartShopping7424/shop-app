import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../constant/dimensions";
import { LogoutAlert } from "../../component";
import colors from "../../constant/colors";

const CustomDrawer = (props) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, User</Text>
      </View>

      {/* rest of the drawer items */}
      <DrawerItemList {...props} />

      {/* logout button */}
      <DrawerItem
        activeTintColor={colors.white}
        activeBackgroundColor={colors.blue}
        inactiveTintColor={colors.gray}
        inactiveBackgroundColor={colors.white}
        icon={({ color }) => (
          <MaterialIcons
            name="logout"
            size={(widthsize * 5) / 100}
            color={color}
            style={{ marginLeft: (widthsize * 1) / 100 }}
          />
        )}
        label="Logout"
        labelStyle={{
          marginLeft: (-widthsize * 3) / 100,
          fontSize: (widthsize * 3) / 100,
          fontFamily: "Regular",
        }}
        onPress={() => setShowLogout(true)}
      />

      {/* logout alert */}
      {showLogout ? (
        <LogoutAlert
          no={() => {
            setShowLogout(false);
            props.navigation.toggleDrawer();
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
  },
  header: {
    height: "30%",
    backgroundColor: "#cedefd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: (heightsize * 1) / 100,
  },
  headerText: {
    fontSize: (widthsize * 4) / 100,
    fontFamily: "SemiBold",
    color: colors.gray,
  },
});

export default CustomDrawer;
