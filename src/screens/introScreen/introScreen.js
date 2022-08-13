import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../utils/dimensions";
import slides from "../../constant/introData";

const IntroScreen = () => {
  const navigation = useNavigation();

  // on complete the intro page
  const onDone = async () => {
    try {
      await AsyncStorage.setItem("page", "intro");
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
      data={slides}
      showSkipButton={true}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      renderNextButton={() => (
        <View style={styles.buttonCircle}>
          <AntDesign
            name="arrowright"
            size={(widthsize * 3) / 100}
            color="#fff"
          />
        </View>
      )}
      renderSkipButton={() => (
        <View style={[styles.buttonCircle, { backgroundColor: "#4cb04a" }]}>
          <AntDesign name="forward" size={(widthsize * 3) / 100} color="#fff" />
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.buttonCircle}>
          <AntDesign name="check" size={(widthsize * 3) / 100} color="#fff" />
        </View>
      )}
      onDone={onDone}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dotStyle}
    />
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: (widthsize * 5) / 100,
    fontWeight: "bold",
  },
  buttonCircle: {
    width: (widthsize * 10) / 100,
    height: (widthsize * 10) / 100,
    borderRadius: (widthsize * 5) / 100,
    backgroundColor: "#3A86FF",
    justifyContent: "center",
    alignItems: "center",
  },
  dotStyle: {
    backgroundColor: "#C4C4C4",
    width: (widthsize * 5) / 100,
    height: (heightsize * 0.5) / 100,
  },
  activeDot: {
    backgroundColor: "#3A86FF",
    width: (widthsize * 5) / 100,
    height: (heightsize * 0.5) / 100,
  },
});
