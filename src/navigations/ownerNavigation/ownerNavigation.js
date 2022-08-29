import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { widthsize } from "../../constant/dimensions";
import { OwnerHome, OwnerNew, OwnerProfile } from "../../screens";
import CustomDrawer from "./customDrawer";
import colors from "../../constant/colors";

const Stack = createNativeStackNavigator();

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
          width: (widthsize * 80) / 100,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="ownerhome"
        component={OwnerHomeStack}
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

// owner home stack
const OwnerHomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ownerhome1"
      headerMode="none"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="ownerhome1" component={OwnerHome} />
      <Stack.Screen name="ownernew" component={OwnerNew} />
    </Stack.Navigator>
  );
};

export default OwnerNavigation;
