import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../constant/dimensions";
import Intro1 from "./intro1";
import Intro2 from "./intro2";
import Intro3 from "./intro3";
import Intro4 from "./intro4";
import colors from "../../constant/colors";

// slides
const slides = [
  {
    component: () => {
      return <Intro1 />;
    },
  },
  {
    component: () => {
      return <Intro2 />;
    },
  },
  {
    component: () => {
      return <Intro3 />;
    },
  },
  {
    component: () => {
      return <Intro4 />;
    },
  },
];

const Intro = () => {
  const [statusBarColor, setStatusBarColor] = useState(colors.white);
  const navigation = useNavigation();

  // change status bar color
  useEffect(() => {}, [statusBarColor]);

  // on complete the intro page
  const onDone = async () => {
    try {
      await AsyncStorage.setItem("page", "auth");
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "auth" }],
      });
      navigation.dispatch(resetAction);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={statusBarColor} animated />
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.container}>{item.component()}</View>
        )}
        renderNextButton={() => (
          <View style={styles.buttonCircle}>
            <AntDesign
              name="arrowright"
              size={(widthsize * 4) / 100}
              color={colors.white}
            />
          </View>
        )}
        renderDoneButton={() => (
          <View style={styles.buttonCircle}>
            <AntDesign
              name="check"
              size={(widthsize * 4) / 100}
              color={colors.white}
            />
          </View>
        )}
        onDone={onDone}
        activeDotStyle={styles.activeDot}
        dotStyle={styles.dotStyle}
        onSlideChange={(index) => {
          setStatusBarColor(
            index == 0
              ? colors.white
              : index == 1
              ? colors.intro_2
              : index == 2
              ? colors.intro_3
              : colors.intro_4
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCircle: {
    width: (widthsize * 10) / 100,
    height: (widthsize * 10) / 100,
    borderRadius: (widthsize * 5) / 100,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  dotStyle: {
    backgroundColor: colors.gray,
    width: (widthsize * 5) / 100,
    height: (heightsize * 0.5) / 100,
  },
  activeDot: {
    backgroundColor: colors.green,
    width: (widthsize * 5) / 100,
    height: (heightsize * 0.5) / 100,
  },
});

export default Intro;
