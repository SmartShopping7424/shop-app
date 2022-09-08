import { Dimensions, StatusBar } from "react-native";

const widthsize = Dimensions.get("screen").width;
const heightsize = Dimensions.get("screen").height;
const statusbarheight = StatusBar.currentHeight;

export { widthsize, heightsize, statusbarheight };
