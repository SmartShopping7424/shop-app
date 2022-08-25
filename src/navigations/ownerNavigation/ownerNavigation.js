import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { widthsize } from "../../constant/dimensions";
import { OwnerHome, OwnerProfile } from "../../screens";
import CustomDrawer from "./customDrawer";
import colors from "../../constant/colors";

const Drawer = createDrawerNavigator();

const OwnerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerType: "slide",
        overlayColor: "rgba(0,0,0,0.6)",
        drawerActiveTintColor: colors.white,
        drawerActiveBackgroundColor: colors.blue,
        drawerInactiveTintColor: colors.gray,
        drawerInactiveBackgroundColor: colors.white,
        drawerAllowFontScaling: false,
        drawerLabelStyle: {
          marginLeft: (-widthsize * 3) / 100,
          fontSize: (widthsize * 3) / 100,
          fontFamily: "Regular",
        },
        drawerStyle: {
          width: (widthsize * 75) / 100,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="ownerhome"
        component={OwnerHome}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={(widthsize * 4.5) / 100}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ownerprofile"
        component={OwnerProfile}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={(widthsize * 5) / 100} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default OwnerNavigation;
