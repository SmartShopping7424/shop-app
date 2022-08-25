import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../../screens";
import AuthNavigation from "../authNavigation/authNavigation";
import OwnerNavigation from "../ownerNavigation/ownerNavigation";
import MaintenanceNavigation from "../maintenanceNavigation/maintenanceNavigation";
import SecurityNavigation from "../securityNavigation/securityNavigation";
import { LogoutAlert } from "../../component";

const Stack = createNativeStackNavigator();

// screen option for stack navigators
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardOverlayEnabled: true,
  animation: "slide_from_right",
};

const PrimaryNavigation = (props) => {
  return (
    <Stack.Navigator
      initialRouteName={props.value}
      headerMode="none"
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen name="intro" component={Intro} />
      <Stack.Screen name="auth" component={AuthNavigation} />
      <Stack.Screen name="ownermain" component={OwnerNavigation} />
      <Stack.Screen name="maintenancemain" component={MaintenanceNavigation} />
      <Stack.Screen name="securitymain" component={SecurityNavigation} />
      <Stack.Screen name="logout" component={LogoutAlert} />
    </Stack.Navigator>
  );
};

export default PrimaryNavigation;
