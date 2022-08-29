import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaintenanceHome } from "../../screens";

const Stack = createNativeStackNavigator();

const MaintenanceNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="maintenancehome"
      headerMode="none"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="maintenancehome" component={MaintenanceHome} />
    </Stack.Navigator>
  );
};

export default MaintenanceNavigation;
