import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SecurityBill, SecurityHome } from "../../screens";

const Stack = createNativeStackNavigator();

// screen option for stack navigators
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardOverlayEnabled: true,
  animation: "slide_from_right",
};

const SecurityNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="securityhome"
      headerMode="none"
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen name="securityhome" component={SecurityHome} />
      <Stack.Screen name="securitybill" component={SecurityBill} />
    </Stack.Navigator>
  );
};

export default SecurityNavigation;
