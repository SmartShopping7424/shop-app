import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../constant/colors";
import { heightsize, widthsize } from "../../constant/dimensions";

const bg_color = "rgba(0,0,0,0.76)";

const PickerBox = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onClose()}>
      {/* main container */}
      <View style={styles.container}>
        <StatusBar backgroundColor={bg_color} animated />

        <TouchableWithoutFeedback onPress={() => null}>
          {/* box container */}
          <View style={styles.boxContainer}>
            {/* title */}
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{props.label}</Text>
            </View>

            <ScrollView>
              {/* map array */}
              {props.arr.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    delayPressIn={0}
                    key={index}
                    onPress={() => props.onValue(item)}
                    style={[
                      styles.listContainer,
                      {
                        borderTopColor:
                          index == 0 ? "transparent" : colors.textinput_border,
                      },
                    ]}
                  >
                    <Text style={styles.listText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: widthsize,
    height: heightsize,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bg_color,
  },
  boxContainer: {
    width: (widthsize * 90) / 100,
    maxHeight: (heightsize * 40) / 100,
    backgroundColor: colors.white,
    borderRadius: (widthsize * 2) / 100,
    overflow: "hidden",
  },
  titleView: {
    width: "100%",
    height: (heightsize * 5.5) / 100,
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
  titleText: {
    fontSize: (widthsize * 3.5) / 100,
    color: colors.white,
    fontFamily: "SemiBold",
    marginLeft: (widthsize * 5) / 100,
  },
  listContainer: {
    width: "100%",
    padding: (widthsize * 3) / 100,
    justifyContent: "center",
    borderTopWidth: 1,
  },
  listText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.black,
    fontFamily: "Regular",
    marginLeft: (widthsize * 2) / 100,
  },
});

export default PickerBox;
