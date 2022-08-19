import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import awsconfig from "./src/config/aws-export";
// import Amplify from "aws-amplify";
// import Constants from "expo-constants";
import * as Font from "expo-font";
import {
  Intro,
  OwnerLogin,
  MaintenanceLogin,
  SecurityLogin,
  OwnerHome,
  SecurityHome,
  MaintenanceHome,
} from "./src/screens";
import colors from "./src/constant/colors";

const Stack = createNativeStackNavigator();

// screen option for stack navigators
const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardOverlayEnabled: true,
  animation: "slide_from_right",
};

// font scaling of text in overall screens
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// font scaling of text in overall screens
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

// auth stack navigator
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ownerlogin"
      headerMode="none"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="ownerlogin" component={OwnerLogin} />
      <Stack.Screen name="maintenancelogin" component={MaintenanceLogin} />
      <Stack.Screen name="securitylogin" component={SecurityLogin} />
    </Stack.Navigator>
  );
};

// main stack navigator of owner
const OwnerMainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ownerhome"
      headerMode="none"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="ownerhome" component={OwnerHome} />
    </Stack.Navigator>
  );
};

// main stack navigator of maintenance
const MaintenanceMainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="maintenancehome"
      headerMode="none"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="maintenancehome" component={MaintenanceHome} />
    </Stack.Navigator>
  );
};

// main stack navigator of security
const SecurityMainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="securityhome"
      headerMode="none"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="securityhome" component={SecurityHome} />
    </Stack.Navigator>
  );
};

// main app
const App = () => {
  const [value, setValue] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    // get stage value (dev or prod)
    // const stage = Constants.manifest.slug.split("-")[2];

    // configure aws amplify according to stage
    //  Amplify.configure(awsconfig[stage]);

    // load fonts
    loadFonts();
  }, [value, render]);

  // loda fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      Bold: require("./assets/fonts/Baloo2-Bold.ttf"),
      Medium: require("./assets/fonts/Baloo2-Medium.ttf"),
      Regular: require("./assets/fonts/Baloo2-Regular.ttf"),
      SemiBold: require("./assets/fonts/Baloo2-SemiBold.ttf"),
    }).then(() => {
      getInitialRouteName();
    });
  };

  // get initial route data
  const getInitialRouteName = async () => {
    try {
      const value = await AsyncStorage.getItem("page");
      if (value != null) {
        setValue(value);
        setRender(true);
      } else {
        setValue("intro");
        setRender(true);
      }
    } catch (e) {
      setValue("intro");
      setRender(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} animated />
      {render ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={value}
            headerMode="none"
            screenOptions={screenOptions}
          >
            <Stack.Screen name="intro" component={Intro} />
            <Stack.Screen name="auth" component={AuthStackNavigator} />
            <Stack.Screen name="ownermain" component={OwnerMainStack} />
            <Stack.Screen
              name="maintenancemain"
              component={MaintenanceMainStack}
            />
            <Stack.Screen name="securitymain" component={SecurityMainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

export default App;
