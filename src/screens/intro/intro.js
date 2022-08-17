import React from "react";
import { StyleSheet, View, Text } from "react-native";
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

const Intro = () => {
  const navigation = useNavigation();

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
    <AppIntroSlider
      data={[1, 2, 3, 4]}
      renderItem={({ index }) => (
        <View style={styles.container}>
          {index == 0 ? (
            <Intro1 />
          ) : index == 1 ? (
            <Intro2 />
          ) : index == 2 ? (
            <Intro3 />
          ) : index == 3 ? (
            <Intro4 />
          ) : (
            <></>
          )}
        </View>
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
    />
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
