import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { AntDesign } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../constant/dimensions";
import colors from "../../constant/colors";
import { StatusBar } from "expo-status-bar";

const bgColor = "rgba(0,0,0,0.8)";

const CameraScan = (props) => {
  // real time update props
  useEffect(() => {}, [props]);

  // scan the product bar code
  const handleBarCodeScanned = async ({ data }) => {
    props.onData(data);
  };

  return (
    <View style={styles.cameraContainer}>
      <StatusBar backgroundColor={bgColor} animated />

      {/* close button */}
      <View style={styles.closeIconContainer}>
        <TouchableOpacity
          style={styles.closeIconView}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => props.onClose()}
        >
          <AntDesign
            name="close"
            size={(widthsize * 5) / 100}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>

      {/* camera view */}
      <View style={styles.cameraView}>
        <Camera
          style={styles.cameraStyle}
          onBarCodeScanned={handleBarCodeScanned}
        >
          <BarcodeMask
            width={(widthsize * 88) / 100}
            height={(heightsize * 48) / 100}
            edgeColor="transparent"
            backgroundColor="transparent"
            showAnimatedLine
            animatedLineWidth={(widthsize * 80) / 100}
            animatedLineHeight={(heightsize * 0.2) / 100}
            lineAnimationDuration={1500}
            animatedLineColor={colors.blue}
            useNativeDriver
          />
        </Camera>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    position: "absolute",
    width: widthsize,
    height: heightsize,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: bgColor,
  },
  cameraView: {
    width: (widthsize * 90) / 100,
    height: (heightsize * 50) / 100,
    borderRadius: (widthsize * 2) / 100,
    overflow: "hidden",
  },
  cameraStyle: {
    flex: 1,
  },
  closeIconContainer: {
    width: (widthsize * 90) / 100,
    alignItems: "flex-end",
    marginBottom: (heightsize * 1) / 100,
  },
  closeIconView: {
    width: (widthsize * 8) / 100,
    height: (widthsize * 8) / 100,
    borderRadius: (widthsize * 4) / 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
  },
});

export default CameraScan;
