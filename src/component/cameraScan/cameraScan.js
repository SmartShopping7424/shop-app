import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { AntDesign } from "@expo/vector-icons";
import { heightsize, widthsize } from "../../constant/dimensions";
import colors from "../../constant/colors";

const CameraScan = (props) => {
  // real time update props
  useEffect(() => {}, [props]);

  // scan the product bar code
  const handleBarCodeScanned = async ({ data }) => {
    setTimeout(() => {
      props.onData(data);
    }, 1000);
  };

  return (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.cameraStyle}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <BarcodeMask
          edgeColor={colors.white}
          showAnimatedLine
          lineAnimationDuration={1300}
          animatedLineColor={colors.blue}
          width={(widthsize * 63) / 100}
          height={(widthsize * 63) / 100}
        />

        {/* close button */}
        <TouchableOpacity
          style={styles.closeIconView}
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => props.onClose()}
        >
          <AntDesign
            name="close"
            size={(widthsize * 5) / 100}
            color={colors.red}
          />
        </TouchableOpacity>
      </Camera>
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
    backgroundColor: "transparent",
  },
  cameraStyle: {
    width: (widthsize * 90) / 100,
    height: (widthsize * 90) / 100,
  },
  closeIconView: {
    position: "absolute",
    top: (heightsize * 2) / 100,
    right: (widthsize * 2) / 100,
    width: (widthsize * 7) / 100,
    height: (widthsize * 7) / 100,
    borderRadius: (widthsize * 5) / 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
  },
});

export default CameraScan;
