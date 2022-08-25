import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaintenanceHome } from "../../screens";

const Stack = createNativeStackNavigator();

// screen option for stack navigators
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardOverlayEnabled: true,
  animation: "slide_from_right",
};

const MaintenanceNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="maintenancehome"
      headerMode="none"
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen name="maintenancehome" component={MaintenanceHome} />
    </Stack.Navigator>
  );
};

export default MaintenanceNavigation;
