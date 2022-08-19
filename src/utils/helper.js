import { Camera } from "expo-camera";

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
