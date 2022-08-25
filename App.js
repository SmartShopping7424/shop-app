import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import awsconfig from "./src/config/aws-export";
// import Amplify from "aws-amplify";
// import Constants from "expo-constants";
import toastConfig from "./src/config/toast-config";
import { PrimaryNavigation } from "./src/navigations";

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
      {/* main navigation */}
      {render ? (
        <NavigationContainer>
          <PrimaryNavigation value={value} />
        </NavigationContainer>
      ) : (
        <View />
      )}

      {/* toast container */}
      <Toast config={toastConfig} position="bottom" visibilityTime={2500} />
    </SafeAreaView>
  );
};

export default App;
