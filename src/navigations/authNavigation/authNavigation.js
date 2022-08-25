import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OwnerLogin, MaintenanceLogin, SecurityLogin } from "../../screens";

const Stack = createNativeStackNavigator();

// screen option for stack navigators
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardOverlayEnabled: true,
  animation: "slide_from_right",
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ownerlogin"
      headerMode="none"
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen name="ownerlogin" component={OwnerLogin} />
      <Stack.Screen name="maintenancelogin" component={MaintenanceLogin} />
      <Stack.Screen name="securitylogin" component={SecurityLogin} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
