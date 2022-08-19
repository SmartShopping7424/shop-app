import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthsize, heightsize } from "../../constant/dimensions";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import security_avatar from "../../../assets/images/security_avatar.png";
import colors from "../../constant/colors";
import { CameraScan } from "../../component";
import { getCameraPermission } from "../../utils/helper";

const SecurityLogin = () => {
  const navigation = useNavigation();
  const [shopId, setShopId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [shopVerify, setShopVerify] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showScanner, setShowScaner] = useState(false);
  const [shopIdErr, setShopIdErr] = useState("");
  const [userIdErr, setUserIdErr] = useState("");
  const [passErr, setPassErr] = useState("");

  // verify shop id
  // const onVerify = async () => {};

  // on login
  // const onLogin = async () => {};

  return (
    <View style={styles.container}>
      {/* image */}
      <View style={styles.avatarView}>
        <Image
          source={security_avatar}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>

      {/*  shop id text input */}
      <View
        style={[
          styles.textInputView,
          {
            backgroundColor: shopVerify
              ? colors.textinput_border
              : colors.white,
            borderColor:
              shopIdErr.length > 0 ? colors.red : colors.textinput_border,
          },
        ]}
      >
        <TextInput
          placeholder="Enter Shop ID"
          editable={shopVerify ? false : true}
          placeholderTextColor={colors.gray}
          autoCapitalize="characters"
          value={shopId}
          onChangeText={(text) => {
            setShopIdErr("");
            setShopId(text);
          }}
          style={styles.textInput}
        />
        {shopVerify ? (
          <TouchableOpacity
            activeOpacity={0.6}
            delayPressIn={0}
            onPress={async () => {
              Keyboard.dismiss();
              setShopId("");
              setUserId("");
              setPassword("");
              setShopIdErr("");
              setUserIdErr("");
              setPassErr("");
              setShopVerify(false);
            }}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ display: shopVerify ? "none" : "flex" }}
            activeOpacity={0.6}
            delayPressIn={0}
            onPress={async () => {
              Keyboard.dismiss();
              const permission = await getCameraPermission();
              if (permission) {
                setShowScaner(true);
              }
            }}
          >
            <AntDesign
              name="scan1"
              size={(widthsize * 5) / 100}
              color={colors.blue}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* invalid shop id err msg */}
      <View
        style={[
          styles.errorTextView,
          { display: shopIdErr.length > 0 ? "flex" : "none" },
        ]}
      >
        <Text style={styles.errText}>{shopIdErr}</Text>
      </View>

      {/*  user id text input */}
      <View
        style={[
          styles.textInputView,
          {
            display: shopVerify ? "flex" : "none",
            borderColor:
              userIdErr.length > 0 ? colors.red : colors.textinput_border,
          },
        ]}
      >
        <TextInput
          placeholder="User ID"
          placeholderTextColor={colors.gray}
          value={userId}
          onChangeText={(text) => {
            setUserIdErr("");
            setUserId(text);
          }}
          style={styles.textInput}
        />
      </View>

      {/* invalid user id err msg */}
      <View
        style={[
          styles.errorTextView,
          { display: userIdErr.length > 0 ? "flex" : "none" },
        ]}
      >
        <Text style={styles.errText}>{userIdErr}</Text>
      </View>

      {/*  password text input */}
      <View
        style={[
          styles.textInputView,
          {
            display: shopVerify ? "flex" : "none",
            borderColor:
              passErr.length > 0 ? colors.red : colors.textinput_border,
          },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.gray}
          value={password}
          secureTextEntry={!showPass}
          onChangeText={(text) => {
            setPassErr("");
            setPassword(text);
          }}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          delayPressIn={0}
          onPress={() => setShowPass(!showPass)}
        >
          <Ionicons
            name={showPass ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={(widthsize * 5) / 100}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>

      {/* invalid pass err msg */}
      <View
        style={[
          styles.errorTextView,
          {
            display: passErr.length > 0 ? "flex" : "none",
          },
        ]}
      >
        <Text style={styles.errText}>{passErr}</Text>
      </View>

      {/* button */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        delayPressIn={0}
        onPress={() => {
          Keyboard.dismiss();
          setLoader(true);
          if (shopVerify) {
            if (userId.length == 0) {
              setUserIdErr("Please enter a valid user id");
              setLoader(false);
            } else if (password.length == 0) {
              setPassErr("Please enter a valid password");
              setLoader(false);
            } else {
              setTimeout(async () => {
                await AsyncStorage.setItem("page", "securitymain");
                await AsyncStorage.setItem("security_user_id", userId);
                setLoader(false);
                const resetAction = CommonActions.reset({
                  index: 0,
                  routes: [{ name: "securitymain" }],
                });
                navigation.dispatch(resetAction);
              }, 2000);
            }
          } else {
            if (shopId.length == 0) {
              setShopIdErr("Please enter a valid shop id");
              setLoader(false);
            } else {
              setTimeout(() => {
                setLoader(false);
                setShopVerify(true);
              }, 2000);
            }
          }
        }}
        // onPress={() => {
        //   setLoader(true);
        //   if (shopVerify) {
        //     onLogin();
        //   } else {
        //     onVerify();
        //   }
        // }}
      >
        {loader ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {shopVerify ? "Login" : "Verify"}
          </Text>
        )}
      </TouchableOpacity>

      {/* if show scanner */}
      {showScanner ? (
        <CameraScan
          onClose={() => {
            setShowScaner(false);
          }}
          onData={(data) => {
            setShowScaner(false);
            setShopId(data);
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarView: {
    marginTop: (heightsize * 3) / 100,
    padding: (widthsize * 6) / 100,
    borderRadius: (widthsize * 50) / 100,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  avatar: {
    width: (widthsize * 30) / 100,
    height: (widthsize * 30) / 100,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 2) / 100,
    backgroundColor: "#fff",
    borderRadius: (widthsize * 2) / 100,
    borderWidth: 1,
    borderColor: colors.textinput_border,
    overflow: "hidden",
    padding: (widthsize * 3) / 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textInput: {
    flex: 1,
    paddingLeft: (widthsize * 1) / 100,
    fontSize: (widthsize * 3) / 100,
    color: colors.black,
    fontFamily: "Regular",
  },
  errorTextView: {
    alignSelf: "center",
    width: (widthsize * 90) / 100,
    marginTop: (heightsize * 0.9) / 100,
  },
  errText: {
    fontSize: (widthsize * 2.3) / 100,
    fontFamily: "Regular",
    color: colors.red,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: (heightsize * 2) / 100,
    width: (widthsize * 90) / 100,
    height: (heightsize * 4.5) / 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    borderRadius: (widthsize * 2) / 100,
  },
  buttonText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.white,
    fontFamily: "SemiBold",
  },
  changeText: {
    fontSize: (widthsize * 3) / 100,
    color: colors.blue,
    fontFamily: "Medium",
  },
});

export default SecurityLogin;
