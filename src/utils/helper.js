import { Camera } from "expo-camera";
import Toast from "react-native-toast-message";

// get random number of any length
export function randomNumber(len) {
  var x = "";
  for (var i = 0; i < len; i++) {
    x += Math.floor(Math.random() * 10);
  }
  return x;
}

// get camera permission
export async function getCameraPermission() {
  const { status } = await Camera.requestCameraPermissionsAsync();
  // if has access
  if (status == "granted") {
    return true;
  }
  return false;
}

// success toast
export async function successToast(text) {
  Toast.show({
    type: "customSuccess",
    text1: text,
  });
}

// error toast
export async function errorToast(text) {
  Toast.show({
    type: "customError",
    text1: text,
  });
}

// warning toast
export async function warningToast(text) {
  Toast.show({
    type: "customWarning",
    text1: text,
  });
}

// get order data
export async function getOrderData() {
  try {
    const res = await fetch("https://demo8102272.mockable.io/producst");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while fetching ::: ", error);
    return null;
  }
}
